import React from 'react';
import {
  Admin,
  Service,
  ContactUs,
  CoreValue,
  PastResult,
  TopSection,
  TeamMembers,
  LegalSituation,
} from "./Sections"
 
export const Home: React.FC = () => {
  return (
    <>
      <TopSection />
      <Service />
      <CoreValue />
      <PastResult />
      <TeamMembers />
      <LegalSituation />
      <Admin />
      <ContactUs />
    </>
  );
};
