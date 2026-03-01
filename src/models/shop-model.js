class ShopModel {
  constructor(shop) {
    this.shopId = shop.shop_id;
    this.name = shop.name;
    this.address = shop.address;
    this.phoneNumber = shop.phone_number;
    this.lat = shop.lat;
    this.lon = shop.lon;
    this.ownerId = shop.owner_id;
    this.description = shop.description;
    this.latestPaidDate = shop.latest_paid_date;
    this.category = shop.category;
    this.openEndTime = shop.open_end_time;
  }

  // Standardization for JSON Payload Keys
  toResponse() {
    return {
      shopId: this.shopId,
      name: this.name,
      address: this.address,
      phoneNumber: this.phoneNumber,
      location: {
        lat: this.lat,
        lon: this.lon
      },
      description: this.description,
      category: this.category,
      openEndTime: this.openEndTime,
      isActive: this._checkSubscriptionStatus()
    };
  }

  // Internal logic to determine if the shop is currently "active"
  _checkSubscriptionStatus() {
    if (!this.latestPaidDate) return false;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(this.latestPaidDate) > thirtyDaysAgo;
  }
}

module.exports = ShopModel;