require 'test_helper'

class ConceptMapsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @concept_map = concept_maps(:one)
  end

  test "should get index" do
    get concept_maps_url
    assert_response :success
  end

  test "should get new" do
    get new_concept_map_url
    assert_response :success
  end

  test "should create concept_map" do
    assert_difference('ConceptMap.count') do
      post concept_maps_url, params: { concept_map: {  } }
    end

    assert_redirected_to concept_map_url(ConceptMap.last)
  end

  test "should show concept_map" do
    get concept_map_url(@concept_map)
    assert_response :success
  end

  test "should get edit" do
    get edit_concept_map_url(@concept_map)
    assert_response :success
  end

  test "should update concept_map" do
    patch concept_map_url(@concept_map), params: { concept_map: {  } }
    assert_redirected_to concept_map_url(@concept_map)
  end

  test "should destroy concept_map" do
    assert_difference('ConceptMap.count', -1) do
      delete concept_map_url(@concept_map)
    end

    assert_redirected_to concept_maps_url
  end
end
