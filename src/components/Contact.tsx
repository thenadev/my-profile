const Contact = () => {
    return (
        <section className="bg-secondery px-5 py-32" id="contact">
            <div className="text-center md:w-[60%] mx-auto text-white">
                <h2 className="text-4xl font-bold mb-5 border-b-[5px] w-[200px] mx-auto border-indigo-600 pb-2">
                    Contact Me
                </h2>
                <p>
                    If you are interested in cooperation feel free to email me.
                </p>

                <p className="py-2">
                    <span className="font-bold">Email:  </span><a
                    href="mailto:email@thomas-schwabauer.de">email@thomas-schwabauer.de</a>
                </p>
            </div>
        </section>
    );
};

export default Contact;
