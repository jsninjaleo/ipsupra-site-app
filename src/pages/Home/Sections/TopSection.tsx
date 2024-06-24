import React, { useEffect, useState } from 'react';
import { MenuIcon } from 'components/menuIcon';
import { SidePanel } from 'components/sidePanel';
import { urlFor } from 'sanityClient';
import { getSanityData } from 'utils/getSanityData';

export const TopSection: React.FC = () => {
  const [menuStatus, setMenuStatus] = useState<boolean>(false);
  const [headerData, setHeaderData] = useState<any>({
    logo: '',
    navbar: [],
    mainText: [],
    buttonText: [],
    clientPhoto: '',
    backgroundImage: '',
  });

  useEffect(() => {
    const CONTENT_QUERY = `*[_type == "topSection"] {
      logo,
      navbar, 
      mainText, 
      buttonText, 
      clientPhoto, 
      backgroundImage, 
    }[0]`;

    getSanityData(CONTENT_QUERY).then(content => setHeaderData(content));
  }, []);

  return (
    <div 
      className='relative bg-cover bg-center flex flex-col h-screen'
      style={{ backgroundImage: `url(${headerData.backgroundImage !== '' ? 
        urlFor(headerData.backgroundImage).url() : 
        ''
      })`}}
    >
      <div className='container mx-auto z-10 h-full max-lg:px-5'>
        <div className='grid grid-cols-12 h-full'>
          <div className='col-span-2 max-md:justify-center max-sm:col-span-5'>
            <div className='flex justify-center items-center pt-5'>
              <img 
                alt='Logo'
                className='max-sm:absolute max-sm:top-2 max-sm:left-0'
                src={headerData.logo !== '' ? 
                  urlFor(headerData.logo).url() : 
                  ''
                } 
              />
            </div>
          </div>
          <div className='hidden max-sm:block col-span-7'>
            <div className='relative h-full flex justify-center items-center'>
              <MenuIcon
                handleMenu={() => setMenuStatus(!menuStatus)}
                openStatus={menuStatus}
              />
            </div>
          </div>
          <div className='col-span-10 text-white max-sm:hidden'>
            <div className='flex justify-end pt-12'>
              {headerData.navbar.map((item: string, index: number) => {
                return (
                  <div className='flex justify-center items-center cursor-pointer pl-14 font-common text-xl font-normal leading-6 max-sm:p-0 max-sm:pt-5' key={index}>
                    {item}
                  </div>
                )
              })}
            </div>
          </div>
          <div className='col-span-6 max-sm:col-span-12 mt-5 max-sm:m-0 max-sm:pt-24'>
            {headerData.mainText.map((item: string, index: number) => {
              return (
                <div
                  key={index}
                  className='flex max-sm:justify-center font-goudy text-8xl font-medium text-white max-xl:text-7xl max-md:text-6xl max-sm:text-5xl'
                >
                  {item}
                </div>
              )
            })}
            <div className='flex max-sm:justify-center mt-10'>
              <div className='text-center w-fit rounded cursor-pointer text-xl max-sm:text-base bg-yellow-500 text-teal-900 font-common font-normal px-5 max-sm:px-4 py-3'>
                {headerData.buttonText}
              </div>
            </div>
          </div>
          <div className='hidden max-sm:col-span-3 max-[320px]:col-span-2 max-sm:block'></div>
          <div className='col-span-6 max-sm:col-span-6 max-[320px]:col-span-8 flex items-end max-sm:justify-center'>
            <div className='h-full flex items-end'>
              <img
                alt='Client'
                className='w-full'
                src={headerData.clientPhoto !== '' ? 
                  urlFor(headerData.clientPhoto).url() :
                  ''
                }
              />
            </div>
          </div>
        </div>
      </div>
      {/* Responsed Side Panel */}
      <SidePanel
        menuStatus={menuStatus}
        sideData={headerData.navbar}
        handleStatus={() => setMenuStatus(!menuStatus)}
      />
      {/* End Responsed Side Panel */}
    </div>
  );
}
