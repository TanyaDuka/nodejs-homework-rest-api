const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');

const { User } = require('../../models/user');

const avatarTemp = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
    try {
        const { path: tempUpload, filename } = req.file;
        const { _id } = req.user;
        const [extention] = filename.split('.').reverse();
        const avatarName = `${_id}.${extention}`;
        const newUpload = path.join(avatarTemp, avatarName);
        await fs.rename(tempUpload, newUpload);
        const file = await jimp.read(newUpload);
        await file.resize(250, 250).write(newUpload);
        const avatarURL = path.join('avatars', newUpload);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({
            avatarURL
        })
    } catch (error) {
        await fs.unlink(req.file.path);
        throw error;
    }
}

module.exports = updateAvatar;