import { useEffect, useState } from 'react'
import { urlFor } from 'sanityClient';
import { getSanityData } from 'utils/getSanityData';

export const LegalSituation: React.FC = () => {
  const [legalSituationData, setLegalSituationData] = useState<any>({
    title: '',
    label: '',
    mainText: '',
    buttonText: '',
    backgroundImage: ''
  });
  // const title = legalSituationData ? legalSituationData.title : '';
  // const label = legalSituationData ? legalSituationData.label : '';
  // const mainText = legalSituationData ? legalSituationData.mainText : '';
  // const buttonText = legalSituationData ? legalSituationData.buttonText : '';
  // const backgroundImage = legalSituationData ? urlFor(legalSituationData.backgroundImage).url() : '';

  useEffect(() => {
    const CONTENT_QUERY = `*[_type == "legalSituationSection"] {
      title,
      label,
      mainText,
      buttonText,
      backgroundImage,
    }[0]`;
    
    getSanityData(CONTENT_QUERY).then(content => setLegalSituationData(content));
  }, []);

  return (
    <>
      <div 
        className='bg-cover bg-center w-full'
        style={{ backgroundImage: `url(${legalSituationData.backgroundImage !== '' ? 
          urlFor(legalSituationData.backgroundImage).url() : 
          ''
        })`}}
      >
        <div className='container mx-auto max-lg:px-10 max-sm:px-5 py-24 max-sm:py-12 max-sm:text-center'>
          <div className='grid grid-cols-12'>
            <div className='col-span-12'>
              <div className='font-common text-yellow-400 font-normal text-base max-sm:text-xs leading-4 tracking-tighter'>
                {legalSituationData.label}
              </div>
              <div className='pt-3 text-white font-goudy font-medium text-4xl max-xl:text-2xl max-sm:text-xl leading-10'>
                {legalSituationData.title}
              </div>
            </div>
            <div className='col-span-8 max-sm:col-start-3'>
              <div className='pt-6 font-common text-white font-normal text-base max-sm:text-sm leading-5'>
                {legalSituationData.mainText}
              </div>
            </div>
          </div>
          <div className='flex max-sm:justify-center pt-10'>
            <div className='text-center w-fit rounded cursor-pointer text-xl max-sm:text-base bg-yellow-500 text-teal-900 font-common font-normal px-5 max-sm:px-4 py-3'>
              {legalSituationData.buttonText}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
