args = commandArgs(trailingOnly=TRUE)

require(igraph) #nutzung von layout
require(comato) #basispaket

concept.scope <- eval(parse(text=args[2]))



#======
#PART 1 - INPUT, TRANSFORMATION & AGGREGATION
#======

#1.1: Einlesen der Rohdaten
#Übernahme des read.folder.tgf-Codes mit Auskommentierung der Konsolenausgaben
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
maps = modify.concepts(data[[1]], concept.scope, filter=T)

#1.3: Aggregierten Graphen erzeugen
g = landscape(maps, mode = "undirected")



#======
#PART 2 - Berechnungen grundlegender Informationen für den JSON-String
#======

#2.1: Clustering und Community-Analyse
cg = cluster_fast_greedy(g)
#Communityfarben entsprechen jenen des Frontends
community.colors = c("rgb(223,240,216)", #brightgreen
"rgb(173,255,47)",  #greenyellow
"rgb(0,128,0)",     #green
"rgb(221,160,221)", #plum
"rgb(225,225,0)",   #yellow
"rgb(225,165,0)",   #orange
"rgb(30,144,255)",  #dodgerblue
"rgb(0,191,255)")   #deepskyblue

#2.2: Erstellung des Pathfinder-Networks
pq = length(V(g))-1
pr = 1
png = pathfinder(g,pq,pr)

#2.3: Compute Centrality (in the sense of Betweenness) and generate a decreasingly ordered list
centrality.g = betweenness(g, V(g))
#String of up to 10 vertices, ordered decreasingly by centrality in g
ocg <- ""
for (i in 1:min(10, length(V(g)))){ocg = paste(ocg, toString(i), ": ", toString(attributes(centrality.g)$names[(order(centrality.g, decreasing = TRUE)[i])]), '<br/>', sep="")}

#2.4: Generate a Layout l to obtain coordinate values
l= layout_nicely(g)
#Distanz-Faktor zum Verhindern überlappender Konzepte (Layoutkoordinaten normiert in [-1,1])
#Optimalerweise in Abhängigkeit von length(V(g))
#dm = 750
dm <- max(500, (length(V(g)))/2 * 150)


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



#Anmerkung zu Links: Leere Transitions-Labels nur akzeptiert, da keine Speicherung der Karte stattfindet.
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


#3.3: Analyse-Teil des JSON-export-strings
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


#3.4: Aufbau des JSON-Gesamtstrings
#Erstellung des ersten Teils: Aggregierte Concept Map
p1.prefix = '{"aggregated_map":{"id":1,"code":"test",'
p1.suffix = '}'
p1 = ""
p1 = paste(p1.prefix, conex, linex, p1.suffix, sep="")

#Erstellung des zweiten Teils: Analyse
p2.suffix = '}'
p2 = ""
p2 = paste(anex, p2.suffix)

#Gesamtstring
json.string = ""
json.string = paste(p1, p2)
cat(json.string)
