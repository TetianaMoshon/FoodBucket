import { FoodBucketPage } from './app.po';

describe('food-bucket App', () => {
  let page: FoodBucketPage;

  beforeEach(() => {
    page = new FoodBucketPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
