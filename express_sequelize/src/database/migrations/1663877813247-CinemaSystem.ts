import { query } from 'express';
import { QueryInterface, Sequelize, DataType } from 'sequelize';

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: (queryInterface: QueryInterface, DataType ): Promise<void> => {
    // return Promise.all([
      queryInterface.createTable('Movies', {
        id: {
          type: 'integer',
          primaryKey: true,
          autoIncrement: true,
        },
        name:DataType.STRING,
        startTime:DataType.INTEGER, //UNIX
        endTime:DataType.INTEGER, //UNIX
        isAllShowsBooked:DataType.BOOLEAN, //UNIX

      })
      queryInterface.createTable('seating', {
        id: {
          type: 'integer',
          primaryKey: true,
          autoIncrement: true,
        },
        type:DataType.STRING,
        price:DataType.FLOAT, //UNIX,
        row:DataType.INTEGER,
        column:DataType.INTEGER,

        
      })
      queryInterface.createTable('pricing', {
        id: {
          type: 'integer',
          primaryKey: true,
          autoIncrement: true,
        },
        movieId:{
          type:DataType.INTEGER,
          references:{
            model:'Movie',
            key:'id'
          },
        },
        showRoomId:{
          type:DataType.INTEGER,
          references:{
            model:'ShowRoom',
            key:'id'
          },
        },
        seatingId:{
          type:DataType.INTEGER,
          references:{
            model:'seating',
            key:'id'
          },
        },
        type:DataType.STRING,
        price:DataType.FLOAT, //UNIX
        
      })
      queryInterface.createTable('ShowRoom', {
        id: {
          type: 'integer',
          primaryKey: true,
          autoIncrement: true,
        },
        name:DataType.STRING,
        isBooked:DataType.BOOLEAN, //UNIX
        movieId:{
          type:DataType.INTEGER,
          references:{
            model:'Movie',
            key:'id'
          },
        },
        row:DataType.INTEGER,
        column:DataType.INTEGER
      })
      queryInterface.createTable('show', {
        id: {
          type: 'integer',
          primaryKey: true,
          autoIncrement: true,
        },
        name:DataType.STRING,
        isBooked:DataType.BOOLEAN, //UNIX
        movieId:{
          type:DataType.INTEGER,
          references:{
            model:'Movie',
            key:'id'
          },
        },
        showRoomId:{
          type:DataType.INTEGER,
          references:{
            model:'ShowRoom',
            key:'id'
          },
        },
        seatingId:{
          type:DataType.INTEGER,
          references:{
            model:'seating',
            key:'id'
          },
        },
      })

    // ]);
    // throw new Error('TODO: implement migration in task 4');
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
