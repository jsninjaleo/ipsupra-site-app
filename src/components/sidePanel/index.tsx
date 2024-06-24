
interface SidePanelProps {
  menuStatus: boolean;
  sideData: string[];
  handleStatus: () => void;
}

export const SidePanel: React.FC<SidePanelProps> = ({menuStatus, sideData, handleStatus}) => {
  return (
    <div
      className={`fixed h-screen z-10 top-0 left-0 bg-gray-900 overflow-x-hidden transition-width duration-500 
        ${
          menuStatus ? 
          'w-40' : 
          'w-0'
        }`
      }
      style={{ paddingTop: '60px' }}
    >
      <button
        className='absolute top-0 right-6 text-3xl text-white'
        onClick={handleStatus}
      >
        ×
      </button>
      {sideData.map((data, index) => {
        return (
          <div
            key={index}
            className='block text-gray-400 text-lg py-2 px-8 transition-colors duration-300 hover:text-white' 
          >
            {data}
          </div>
        )
      })}
    </div>
  )
}