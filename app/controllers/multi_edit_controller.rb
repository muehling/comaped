class MultiEditController < ApplicationController

    def update
        if !@concept_map.multi_edit(concept_maps_params)
          render error: {error: "unable to update"}, status 400
        end
    end

    def multi_edit_params
        params.require(:multi_edit).permit(:id, :label)
      end

end
