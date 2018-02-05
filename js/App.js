var House = {
  /**
   * Serialize the server object into RoomModel
   * @param {string[]} roomNameList An array of room names.
   * @return {RoomModel[]} An array of instantiated RoomModels.
   */
  createRooms: function(roomNameList) {
    return roomNameList.map(function(roomName) {
      return new RoomModel(roomName);
    });
  },

  /**
   * Create the room views displayed on the left of the page
   * @param {RoomModel[]} rooms An array of RoomModel.
   */
  setupSwitchboard: function(rooms) {
    rooms.forEach(roomModel => {
      var view = new RoomView(roomModel);
      var controller = new RoomController(roomModel, view);
    });
  },

  /**
   * Create the plan view that manipulate the floor plan SVG
   * @param {RoomModel[]} rooms An array of RoomModels.
   */
  setupPlan: function(rooms) {
    var planView = new PlanView(rooms);
  }
};

serverApi.init().done(function() {
  serverApi.getRoomList().done(function(roomNameList) {
    $(function() {
      // Create the views (DOM insertion) when the DOM is ready
      var roomModels = House.createRooms(roomNameList);
      House.setupSwitchboard(roomModels);

      $('object').on('load', function() {
        // Bind and update the SVG element when it's loaded
        House.setupPlan(roomModels);
      });
    });
  });
});
