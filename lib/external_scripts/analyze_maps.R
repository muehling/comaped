args = commandArgs(trailingOnly=TRUE)



require(igraph) #nutzung von layout
require(comato) #basispaket


args <- commandArgs(trailingOnly=TRUE)
concept.scope <- eval(parse(text=args[2]))



#======
#PART 1 - INPUT, TRANSFORMATION & AGGREGATION
#======
#1.1: Einlesen der Rohdaten
#data = read.folder.tgf("./Daten Concept Maps/")
#data = read.folder.tgf(toString(args[1]))
toDo <- list.files(path=toString(args[1]), pattern="*.tgf", full.names=T)
order = c()
res <- list()
for (f in toDo) {
    #cat(basename(f))
    #cat("\n")
    m <- read.tgf(f, TRUE)
    res <- c(res, list(m))
    order = c(order, strsplit(basename(f), "\\.")[[1]][1])
}
data = list(conceptmaps(res, filter=F), order)



#1.2: Nur einige Konzepte beruecksichtigen um die Graphen zu vereinheitlichen. maps ist ein conceptmaps-Objekt
#maps = modify.concepts(data[[1]], c("Programm", "Daten", "Algorithmus", "Methode", "Objekt", "Klasse", "Attribut", "Wert"), filter=T)
maps = modify.concepts(data[[1]], concept.scope, filter=T)
#maps = modify.concepts(data[[1]], c("Auto", "Motor"), filter=T)
#Alternativ die ganzen igraph Objekte in einer Liste speichern
#graphs = lapply(maps$maps, FUN=function(x) {x$map})

#1.3: Aggregierten Graphen erzeugen
g = landscape(maps, mode = "undirected")



#======
#PART 2 - COMPUTING DATA USED IN STRING
#======
#2.1: Analyze Communities, concepts of one community share the same color
cg = cluster_fast_greedy(g)
#community colors match those usable in CoMapEd frontend
community.colors = c("rgb(223,240,216)", #brightgreen
"rgb(173,255,47)",  #greenyellow
"rgb(0,128,0)",     #green
"rgb(221,160,221)", #plum
"rgb(225,225,0)",   #yellow
"rgb(225,165,0)",   #orange
"rgb(30,144,255)",  #dodgerblue
"rgb(0,191,255)")   #deepskyblue

#2.2: Generate the Pathfinder Network of an aggregated concept map graph g with parameters q r
#only the pngraph links are exported
pq = length(V(g))-1
pr = 1
png = pathfinder(g,pq,pr)
#pn.laylout = layout_nicely(png)
#plot(png,pn.layout)

#2.3: Compute Centrality (in the sense of Betweenness) and generate a decreasingly ordered list
centrality.g = betweenness(g, V(g))
#String of up to 10 vertices, ordered decreasingly by centrality in g
ocg <- ""
for (i in 1:min(10, length(V(g)))){ocg = paste(ocg, toString(i), ": ", toString(attributes(centrality.g)$names[(order(centrality.g, decreasing = TRUE)[i])]), '<br/>', sep="")}

#2.4: Generate a Layout l to obtain coordinate values
l= layout_nicely(g)
#plot(g)
#plot(g,l)
#distance multiplier: layout distance normalized in [-1,1], resulting in heavily overlapping concepts
dm = 750




#======
#PART 3 - BUILDING THE JSON STRING
#======


#3.1: CONEX - Concept Export
conex.prefix = '"concepts":['
conex.body = ""
for(i in 1:length(V(g))){
    single.concept = paste('{"id":',toString(i),
    ',"label":"', toString(V(g)[i]$name),
    '","x":"', as.integer((l[i,1])*dm*-1),
    '","y":"', as.integer((l[i,2])*dm),
    '","color":"', community.colors[(cg$membership[i]%%length(community.colors))] ,
    '"}',
    sep=""
    )
    if(i==1){conex.body = paste(conex.body, single.concept)}
    else {conex.body = paste(conex.body, single.concept, sep=",")}
}
conex.suffix = "]"
conex = ""
conex = paste(conex.prefix, conex.body, conex.suffix, sep="")



#Links: empty link labels only accepted by CoMapEd, since these results are not saved in database.
#MAP-id: Hilfswert


#3.2: LINEX - Link Export
linex.prefix = ',"links":['
linex.body = ""
for(i in 1:length(E(png))){
    single.link = paste('{"id":',toString(i),
    ',"start_id":', toString(as.numeric(V(g)[get.edgelist(png)[i,1]])),
    ',"end_id":', toString(as.numeric(V(g)[get.edgelist(png)[i,2]])),
    ',"label":', '""',
    "}"
    )
    if(i==1){linex.body = paste(linex.body, single.link)}
    else {linex.body = paste(linex.body, single.link, sep=",")}
}
linex.suffix = "]"
linex = ""
linex = paste(linex.prefix, linex.body, linex.suffix)

#Analyse-Teil des JSON-export-strings
anex.prefix = ',"analysis":{'
anex.body = ""
anex.body = paste('"Anzahl der Knoten" : "',toString(length(V(g))),
'","Anzahl der Kanten" : "', toString(length(E(g))),
'","Communities" : "', toString(length(communities(cg))),
'","Centrality" : "', ocg, '"',
sep=""
)



anex.suffix = "}"
anex = ""
anex = paste(anex.prefix, anex.body, anex.suffix, sep="")


#3.4: Building the full JSON String
#Generate the first part of the JSON string: aggregated map
p1.prefix = '{"aggregated_map":{"id":1,"code":"test",'
p1.suffix = '}'
p1 = ""
p1 = paste(p1.prefix, conex, linex, p1.suffix, sep="")

#Generate the second part of the JSON string: analysis
p2.suffix = '}'
p2 = ""
p2 = paste(anex, p2.suffix)

#Generate full JSON String
json.string = ""
json.string = paste(p1, p2)
cat(json.string)






#test = ' {"aggregated_map":{"id":1,"code":"test","concepts":[ {"id":1,"label":"Wert","x":"4","y":"-1092","color":"rgb(223,240,216)"},{"id":2,"label":"Algorithmus","x":"323","y":"-537","color":"rgb(173,255,47)"},{"id":3,"label":"Programm","x":"240","y":"-745","color":"rgb(173,255,47)"},{"id":4,"label":"Daten","x":"334","y":"-975","color":"rgb(173,255,47)"},{"id":5,"label":"Methode","x":"61","y":"-537","color":"rgb(173,255,47)"},{"id":6,"label":"Objekt","x":"-123","y":"-688","color":"rgb(223,240,216)"},{"id":7,"label":"Klasse","x":"10","y":"-704","color":"rgb(223,240,216)"},{"id":8,"label":"Attribut","x":"-123","y":"-888","color":"rgb(223,240,216)"}],"links":[  {"id": 1 ,"start_id": 1 ,"end_id": 2 ,"label": "" },{"id": 2 ,"start_id": 1 ,"end_id": 3 ,"label": "" },{"id": 3 ,"start_id": 1 ,"end_id": 4 ,"label": "" },{"id": 4 ,"start_id": 1 ,"end_id": 5 ,"label": "" },{"id": 5 ,"start_id": 1 ,"end_id": 6 ,"label": "" },{"id": 6 ,"start_id": 1 ,"end_id": 8 ,"label": "" },{"id": 7 ,"start_id": 2 ,"end_id": 2 ,"label": "" },{"id": 8 ,"start_id": 2 ,"end_id": 3 ,"label": "" },{"id": 9 ,"start_id": 2 ,"end_id": 4 ,"label": "" },{"id": 10 ,"start_id": 2 ,"end_id": 5 ,"label": "" },{"id": 11 ,"start_id": 2 ,"end_id": 6 ,"label": "" },{"id": 12 ,"start_id": 2 ,"end_id": 7 ,"label": "" },{"id": 13 ,"start_id": 2 ,"end_id": 8 ,"label": "" },{"id": 14 ,"start_id": 3 ,"end_id": 3 ,"label": "" },{"id": 15 ,"start_id": 3 ,"end_id": 4 ,"label": "" },{"id": 16 ,"start_id": 3 ,"end_id": 5 ,"label": "" },{"id": 17 ,"start_id": 3 ,"end_id": 6 ,"label": "" },{"id": 18 ,"start_id": 3 ,"end_id": 7 ,"label": "" },{"id": 19 ,"start_id": 3 ,"end_id": 8 ,"label": "" },{"id": 20 ,"start_id": 4 ,"end_id": 5 ,"label": "" },{"id": 21 ,"start_id": 4 ,"end_id": 6 ,"label": "" },{"id": 22 ,"start_id": 4 ,"end_id": 7 ,"label": "" },{"id": 23 ,"start_id": 4 ,"end_id": 8 ,"label": "" },{"id": 24 ,"start_id": 5 ,"end_id": 5 ,"label": "" },{"id": 25 ,"start_id": 5 ,"end_id": 6 ,"label": "" },{"id": 26 ,"start_id": 5 ,"end_id": 7 ,"label": "" },{"id": 27 ,"start_id": 5 ,"end_id": 8 ,"label": "" },{"id": 28 ,"start_id": 6 ,"end_id": 7 ,"label": "" },{"id": 29 ,"start_id": 6 ,"end_id": 8 ,"label": "" },{"id": 30 ,"start_id": 7 ,"end_id": 7 ,"label": "" },{"id": 31 ,"start_id": 7 ,"end_id": 8 ,"label": "" },{"id": 32 ,"start_id": 8 ,"end_id": 8 ,"label": "" } ]} ,"analysis":{ "Anzahl der Knoten":"8","Anzahl der Kanten":"32","Communities":"2","Centrality":"1: Algorithmus<br/>2: Daten<br/>3: Wert<br/>4: Attribut<br/>5: Programm<br/>6: Methode<br/>7: Objekt<br/>8: Klasse<br/>" } } '
#cat(test)
