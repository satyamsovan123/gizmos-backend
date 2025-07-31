import mongoose, { model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

/**
 * This function uses Mongoose to create a new document in the specified model.
 * @param {*} model - The Mongoose model to use.
 * @param {*} data - The data to create the document with.
 * @returns {Promise<*>} - The created document.
 * @throws {Error} - If there is an error creating the document.
 */
async function create(model, data) {
  try {
    const newRecord = await model.create(data);
    return newRecord;
  } catch (error) {
    throw new Error("Error creating record: " + error.message);
  }
}

/**
 * This function uses Mongoose to find documents in the specified model.
 * @param {*} model - The Mongoose model to use.
 * @param {*} query - The query to find documents.
 * @returns {Promise<*>} - The found documents.
 * @throws {Error} - If there is an error finding the documents.
 */
async function find(model, query) {
  try {
    const records = await model.find(query).lean();
    return records;
  } catch (error) {
    throw new Error("Error finding records: " + error.message);
  }
}

/**
 * This function uses Mongoose to find document in the specified model.
 * @param {*} model - The Mongoose model to use.
 * @param {*} query - The query to find documents.
 * @returns {Promise<*>} - The found documents.
 * @throws {Error} - If there is an error finding the documents.
 */
async function findOne(model, query) {
  try {
    const record = await model.findOne(query).lean();
    return record;
  } catch (error) {
    throw new Error("Error finding record: " + error.message);
  }
}

/**
 * This function uses Mongoose to aggregate documents in the specified model.
 * @param {*} model - The Mongoose model to use.
 * @param {*} pipeline - The aggregation pipeline to apply.
 * @returns {Promise<*>} - The aggregated documents.
 * @throws {Error} - If there is an error aggregating the documents.
 */
async function aggregate(model, pipeline) {
  try {
    const results = await model.aggregate(pipeline);
    return results;
  } catch (error) {
    throw new Error("Error aggregating records: " + error.message);
  }
}

/**
 * This function uses Mongoose to update a document in the specified model.
 * @param {*} model - The Mongoose model to use.
 * @param {*} query - The query to find the document.
 * @param {*} data - The data to update the document with.
 * @returns {Promise<*>} - The updated document.
 * @throws {Error} - If there is an error updating the document.
 */
async function update(model, query, data) {
  try {
    const updatedRecord = await model
      .findOneAndUpdate(query, data, {
        new: true,
      })
      .lean();
    return updatedRecord;
  } catch (error) {
    throw new Error("Error updating record: " + error.message);
  }
}

/**
 * This function uses Mongoose to delete a document in the specified model.
 * @param {*} model - The Mongoose model to use.
 * @param {*} query - The query to find the document.
 * @returns {Promise<*>} - The deleted document.
 * @throws {Error} - If there is an error deleting the document.
 */
async function remove(model, query) {
  try {
    const deletedRecord = await model.findOneAndDelete(query).lean();
    return deletedRecord;
  } catch (error) {
    throw new Error("Error deleting record: " + error.message);
  }
}

export { create, find, findOne, aggregate, update, remove };
