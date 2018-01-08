const convertTweet = (data, coordinates) => {
    coordinates = coordinates || {
        lng: parseFloat(data.coordinates.coordinates[0]),
        lat: parseFloat(data.coordinates.coordinates[1])
    };

    return {
        twid: data.id,
        coordinates: coordinates,
        text: data.text,
        hashTags: data.entities.hashtags,
        author: data.user.name,
        avatar: data.user.profile_image_url,
        created_at: data.created_at,
        lang: data.lang
    };
};

module.exports = {
    convertTweet
};

