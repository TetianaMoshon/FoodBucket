import { FoodBucketPage } from './app.po';

describe('food-bucket App', function() {
  let page: FoodBucketPage;

  beforeEach(() => {
    page = new FoodBucketPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
