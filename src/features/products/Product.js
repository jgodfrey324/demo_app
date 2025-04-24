import Image from 'next/image'
import React, { useState } from 'react';

export default function Product({ product }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <section className="border w-1/3 p-8 bg-gray-200 flex justify-items-between">
      <section className="w-1/2 me-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{product.title}</h3>
        {/* <div className="flex justify-items-start w-auto h-auto">
          <Image 
            src={product.image}
            alt="A product"
            width={100}
            height={100}
            className="object-contain"
          />
        </div> */}
      </section>
      <section className="w-1/2 flex flex-col items-end">
        <p className="text-lg text-indigo-900 border border-indigo-900 rounded-2xl w-fit px-2 mt-8 mb-2">${product.price}</p>
        <section className="flex flex-col items-end">
          <p 
            className="text-lg text-indigo-900 bg-indigo-100 rounded-2xl w-fit px-4 py-1 cursor-pointer border hover:shadow-md hover:border-indigo-900 transition-all ease-in-out duration-300" 
            onClick={handleToggle}>
              Details {isVisible ? '<' : '>'}
          </p>
          {isVisible && (
            <p className="text-md text-gray-600 px-4 mt-2">{product.description}</p>
          )}
        </section>
      </section>
    </section>
  )
}
