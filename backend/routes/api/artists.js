const express = require('express');
const router = express.Router();

const { User, Song, Album, Playlist } = require('../../db/models');

/******************** GET ********************/

// GET all Albums of an Artist based on the Artist's id
router.get('/:artistId/albums', async (req, res) => {
    const { artistId } = req.params;
    const artist = await User.findByPk(artistId);

    if(artist){
        const Albums = await Album.findAll({
            where: { userId: artistId },
            attributes: [
                "id",
                "userId",
                "title",
                "description",
                "createdAt",
                "updatedAt",
                "previewImage"
            ]
        })
        res.json({ Albums })
    } else {
        const error = new Error("Artist couldn't be found");
        error.status = 404;
        throw error;
    }
})

// GET all Playlists of an artist based on Artist's id
router.get('/:artistId/playlists', async (req, res) => {
    const { artistId } = req.params;
    const artist = await User.findByPk(artistId);

    if(artist){
        const Playlists = await Playlist.findAll({
            where: { userId: artistId },
            attributes: [
                "id",
                "userId",
                "name",
                "createdAt",
                "updatedAt",
                "previewImage"
            ]
        });
        res.json({ Playlists })
        // res.json({ Playlists: artist.Playlists })
    } else {
        const error = new Error("Artist couldn't be found");
        error.status = 404;
        throw error;
    }
})

// GET all Songs of an Artist from an id
router.get('/:artistId/songs', async (req, res) => {
    const { artistId } = req.params;
    const artist = await User.findByPk(artistId);

    if(artist){
        const Songs = await Song.findAll({
            where: { userId: artistId },
            attributes: [
                "id",
                "userId",
                "albumId",
                "title",
                "description",
                "url",
                "createdAt",
                "updatedAt",
                "previewImage"
            ]
        })
        res.json({ Songs });
    } else {
        const error = new Error("Artist couldn't be found");
        error.status = 404;
        throw error;
    }
})

// GET details of an artist from id
router.get('/:artistId', async (req, res) => {
    const { artistId } = req.params;
    const artist = await User.findByPk(artistId, {
        attributes: [
            "id", "username", "previewImage"
        ]
    });

    const totalSongs = await Song.count({ where: { userId: artistId }});
    const totalAlbums = await Album.count({ where: { userId: artistId }});

    if(artist){
        res.json({...artist.dataValues, totalSongs, totalAlbums})
    } else {
        const error = new Error("Artist couldn't be found");
        error.status = 404;
        throw error;
    }
})

module.exports = router;
