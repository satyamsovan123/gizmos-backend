import mongoose, { model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

async function create(model, data) {
  try {
    const newRecord = await model.create(data);
    return newRecord;
  } catch (error) {
    throw new Error("Error creating record: " + error.message);
  }
}

async function find(model, query) {
  try {
    const records = await model.find(query).lean();
    return records;
  } catch (error) {
    throw new Error("Error finding records: " + error.message);
  }
}

async function aggregate(model, pipeline) {
  try {
    const results = await model.aggregate(pipeline);
    return results;
  } catch (error) {
    throw new Error("Error aggregating records: " + error.message);
  }
}

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

async function remove(model, query) {
  try {
    const deletedRecord = await model.findOneAndDelete(query).lean();
    return deletedRecord;
  } catch (error) {
    throw new Error("Error deleting record: " + error.message);
  }
}

export { create, find, aggregate, update, remove };
