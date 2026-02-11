import React from 'react'

const ProfileCircle: React.FC = () => {
  return (
    <div className="relative flex">
      <div className="w-72 h-72 bg-blue-500 rounded-full flex items-center justify-center hover:cursor-pointer group">
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="80"
          height="80"
          viewBox="0,0,300,150"
          className="absolute"
          style={{ top: '70%', left: '65%' }}
        >
          <g
            fill="none"
            fillRule="nonzero"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="inherit"
          >
            <g transform="scale(2,2)">
              <path
                d="M70,44.7v43.7h20.1h24.9c1.8,0 2.7,-2.2 1.4,-3.4l-43,-41.7c-1.3,-1.2 -3.4,-0.3 -3.4,1.4z"
                fill="#faad1a"
              ></path>
              <path
                d="M50,44.7v60.2c0,1.8 2.2,2.7 3.5,1.4l16.7,-17.8h24.9c1.8,0 2.7,-2.2 1.4,-3.4l-43.1,-41.8c-1.3,-1.2 -3.4,-0.3 -3.4,1.4z"
                fill="#ffffff"
              ></path>
              <path
                d="M42.3,24.5c-1.2,0 -2.3,-0.7 -2.8,-1.8l-5.7,-13.9c-0.6,-1.5 0.1,-3.3 1.6,-3.9c1.5,-0.6 3.3,0.1 3.9,1.6l5.8,13.9c0.6,1.5 -0.1,3.3 -1.6,3.9c-0.4,0.2 -0.8,0.2 -1.2,0.2z"
                fill="#444b54"
              ></path>
              <path
                d="M30.9,37c-0.3,0 -0.6,0 -0.9,-0.1l-14.3,-4.5c-1.6,-0.5 -2.5,-2.2 -2,-3.8c0.5,-1.6 2.2,-2.5 3.8,-2l14.3,4.5c1.6,0.5 2.5,2.2 2,3.8c-0.4,1.3 -1.6,2.1 -2.9,2.1z"
                fill="#444b54"
              ></path>
              <path
                d="M98.5,82.8l-43,-41.7c-1.4,-1.4 -3.6,-1.8 -5.4,-1c-1.9,0.8 -3,2.6 -3,4.6v60.2c0,2.1 1.2,3.9 3.2,4.7c0.6,0.2 1.2,0.4 1.8,0.4c1.4,0 2.7,-0.6 3.6,-1.6l13.5,-14.4l9.2,22.2c0.5,1.2 1.6,1.8 2.8,1.8c0.4,0 0.8,-0.1 1.2,-0.2c1.5,-0.6 2.3,-2.4 1.6,-3.9l-9.3,-22.3h20.4c2,0 3.9,-1.2 4.6,-3.1c0.8,-2.1 0.3,-4.2 -1.2,-5.7zM70.1,85.4c-0.8,0 -1.6,0.3 -2.2,1l-14.9,16v-55.3l39.6,38.4h-22.5z"
                fill="#444b54"
              ></path>
              <path
                d="M59.3,25.3c-0.5,0 -0.9,-0.1 -1.4,-0.3c-1.5,-0.8 -2,-2.6 -1.3,-4l7,-13.3c0.8,-1.5 2.6,-2 4,-1.3c1.5,0.8 2,2.6 1.3,4l-7,13.3c-0.5,1 -1.5,1.6 -2.6,1.6z"
                fill="#444b54"
              ></path>
            </g>
          </g>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
          {/* <div className="p-4 rounded-lg shadow-lg bg-black bg-opacity-75"> */}
          <div className="memoji__info flex flex-col">
            <span>이화진</span>
            <span>1997.03.01</span>
            <span>✉️ hwajin3114@gmail.com</span>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default ProfileCircle
