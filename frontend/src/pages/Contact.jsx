import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-100 py-10 px-5 md:px-20">
      {/* Banner Image Section */}
      <div className="w-full h-48 bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/src/Images/Contact.jpg')" }}></div>

      {/* Information Boxes */}
      <div className="flex flex-col md:flex-row justify-center gap-6 mt-10">
        <div className="bg-green-500 text-white p-8 h-48 w-80 rounded-lg text-center transition-transform transform hover:scale-105 hover:shadow-lg">
          <h3 className="text-lg font-semibold">About</h3>
          <p>Lorem ipsum is simply free text used by copytyping refreshing.</p>
        </div>
        <div className="bg-yellow-500 text-white p-8 h-48 w-80 rounded-lg text-center transition-transform transform hover:scale-105 hover:shadow-lg">
          <h3 className="text-lg font-semibold">Contact</h3>
          <p>+1 (240)-335-0079</p>
          <p>support@agrios.com</p>
          <p>Mon - Fri: 7:00 am - 6:00 pm</p>
        </div>
        <div className="bg-orange-500 text-white p-8 h-48 w-80 rounded-lg text-center transition-transform transform hover:scale-105 hover:shadow-lg">
          <h3 className="text-lg font-semibold">Address</h3>
          <p>66 Broklyn Road, Golden Street, New York, USA</p>
        </div>
      </div>

      {/* Map & Contact Form */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="h-auto">
          <iframe
            title="Google Map"
            className="w-full h-[400px] rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3473.890252632641!2d76.8160575751423!3d29.94880697497912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e4896f7d4a8a1%3A0x2e9f58c96e2b9c1f!2sMCA%20Department%2C%20NIT%20Kurukshetra!5e0!3m2!1sen!2sin!4v1710588309000!5m2!1sen!2sin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="bg-white p-8 h-auto rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Write a Message</h3>
          <form>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
            />
            <textarea
              placeholder="Write a Message"
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows="5"
            ></textarea>
            <button
              className="w-full bg-green-500 text-white py-3 rounded-md transition-transform transform hover:scale-105 hover:bg-green-600 active:scale-95 active:bg-green-700 shadow-lg"
            >
              Send a Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
