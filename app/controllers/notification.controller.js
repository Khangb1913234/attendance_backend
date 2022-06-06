const mongoose = require('mongoose');
const { BadRequestError } = require('../error');
const handlePromise = require('../helpers/promise.helper');
const Notification = require('../models/notification.model');
exports.create = async function(req, res, next){
    if(!req.body.name)
        return next(new BadRequestError(400, "Tên không thể để trống"));
    const notification = new Notification(
        {
            name: req.body.name,
            content: req.body.content,
            image: req.body.image,
        }
    );
    const [error, document] = await handlePromise(notification.save());
    if(error)
        return next(new BadRequestError(500, "Có lỗi trong quá trình tạo"));
    return res.send(document);
};
exports.findAll = async function(req, res, next){
    const condition = {  };
    const {name} = req.query;
    if (name) 
        condition.name = { $regex: new RegExp(name), $options: "i" };
    
    const [error, documents] = await handlePromise(Notification.find(condition));
    if (error) 
        return next(new BadRequestError (500, "Có lỗi trong quá trình tìm kiếm"));
    return res.send(documents) ;
};
exports.findOne = async function(req, res, next){
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null
    }
    const [error, document] = await handlePromise(Notification.findOne(condition));
    if (error)
        return next(new BadRequestError(500, `Lỗi trong quá trình tìm kiếm địa điểm với id=${req.params.id}` )) ;
    
    if (!document) 
        return next(new BadRequestError(404, "Không tìm thấy địa điểm này" )) ;
    return res.send(document);
};
exports.update = async function(req, res, next){
    if (Object.keys(req.body).length === 0)
        return next(new BadRequestError(400, "Dữ liệu cần cập nhật không thể trống" ));
	const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null
    };
    
    const [error, document] = await handlePromise(
        Notification.findOneAndUpdate(condition, req.body, { new: true} )
    );
    
    if (error) 
        return next(new BadRequestError(500, `Lỗi trong quá trình cập nhật địa điểm với id=${req.params.id}` )) ;
    
    if (!document) 
        return next(new BadRequestError(404, "Không tìm thấy địa điểm này”))"));
    
    return res.send({ message: "Địa điểm đã cập nhật thành công", });
};
exports.delete = async function(req, res, next){
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null
    };
    const [error, document] = await handlePromise(
        Notification.findOneAndDelete(condition)
    );
    if (error)
        return next(new BadRequestError(500, `Không thể xóa địa điểm với id=${req.params.iđ}` )) ;
    
    if (!document)
        return next(new BadRequestError(404, "Không tìm thấy địa điểm này"));
    return res.send({ message: "Đã xóa địa điểm thành công", });
};
exports.deleteAll = async function(req, res, next){
    const [error, data] = await handlePromise(
        Notification.deleteMany({ })
    );
    
    if (error)
        return next(new BadRequestError(500, "Có lỗi xảy ra trong quá trình xóa tất cả địa điểm"));
    return res.send({ message: `${data.deletedCount} địa điểm đã được xóa thành công`});
};