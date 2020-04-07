// Class structure inspired by Stuyk
import * as alt from 'alt';
import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

import config from './config.json';

let instance;

export default class ConnectionInfo {
  /**
   *
   * @param {MongoClient} client
   */
  constructor() {
    if (instance) {
      return instance;
    }
    console.log('⏳ Database: Starting...');

    if (config.auth) {
      /** @type {mongodb.MongoClient} */
      this.client = new MongoClient(`mongodb://${config.host}:${config.port}`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        auth: {
          user: config.user,
          password: config.password
        }
      });
    } else {
      /** @type {mongodb.MongoClient} */
      this.client = new MongoClient(`mongodb://${config.host}:${config.port}`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
    }

    this.client.connect(async (err) => {
      if (err) {
        console.log(err);
        return;
      }

      /** @type {mongodb.Db} Main connection */
      this.db = this.client.db('altv');
      this.generateCollection();
      instance = this;
    });
  }

  async generateCollection() {
    await this.db.createCollection('whitelist', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['id'],
          properties: {
            id: {
              bsonType: 'array',
              description: 'whitelisted identifiers'
            }
          }
        }
      }
    });
    await this.fetchAllData('whitelist').then((res) => {
      if (res.length == 0) {
        this.insertData({ id: [] }, 'whitelist').then((docId) => console.log(docId));
        return;
      }
    });
    console.log('✅ Database: Ready!');
    alt.emit('database:ready');
  }

  async fetchAllData(collection) {
    return await this.db.collection(collection).find().toArray();
  }

  async pushOne(id, data, collection) {
    await this.db.collection(collection).updateOne({ _id: ObjectID(id) }, { $push: { id: data } });
  }

  async pullOne(id, data, collection) {
    await this.db.collection(collection).updateOne({ _id: ObjectID(id) }, { $pull: { id: data } });
  }
}

// first database init
new ConnectionInfo();
