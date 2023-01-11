const City = require('../models/city');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const city = await City.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    city.reviews.push(review);
    await review.save();
    await city.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/cities/${city._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await City.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/cities/${id}`);
}