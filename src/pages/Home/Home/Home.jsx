import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import ExtraSection from './ExtraSection';
import CustomerReviews from './CustomerReviews';
import DailyMeals from './DailyMeals';

const Home = () => {
  useEffect(() => {
    document.title = "Home | Your App Name";
  }, []);

  return (
    <div>
      <Banner />
      <DailyMeals />
      <CustomerReviews />
      <ExtraSection />
    </div>
  );
};

export default Home;
