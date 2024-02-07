import React from 'react';
import './BookFlipper.css';

const BookFlipper = () => {
    return (
        <main className="unique-main-class">
            <div className="book unique-book-class">
                <div className="book-cover unique-book-cover-class">
                    <div className="unique-cover-div-class">
                        <h1 className="unique-h1-class">Mrs. Dalloway</h1>
                        <div className="separator unique-separator-class"></div>
                        <h2 className="unique-h2-class">by Virginia Woolf</h2>
                    </div>
                </div>
                <div className="book-content unique-book-content-class">
                    <h3 className="unique-h3-class">An Excerpt from Chapter One</h3>
                </div>
            </div>
        </main>
    );
};

export default BookFlipper;
