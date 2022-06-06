const mongoose = require("mongoose");
const schema = mongoose.Schema(
	{   
		name: {
			type: String,
			required: [true, 'Name is required']
		},
		content: String,
		image: String,
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
module.exports = mongoose.model('notification', schema);