const mongoose = require("mongoose");
const schema = mongoose.Schema(
	{   
		name: {
			type: String,
			required: [true, 'Name is required']
		},
		uid: {
			type: String,
			required: [true, 'MSSV is required']
		},
		birthday: String,
		hometown: String,
		mail: String,
	},
	{
		timestamps: true
	}
)
schema.method('toJSON', function(){
	const { __v, _id, ...object} = this.toObject();
	object.id = _id;
	return object;
});
module.exports = mongoose.model('student', schema);