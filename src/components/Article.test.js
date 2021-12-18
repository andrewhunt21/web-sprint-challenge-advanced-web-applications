import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import { resetArticles } from '../mocks/data';
jest.mock('../mocks/data');

import Article from './Article';

test('renders component without errors', ()=> {
    render(<Article articles={[]}/>);
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article headline={"test headline"} author={"test author"} />);

    const headline = screen.getByTestId('headline');
    const author = screen.getByTestId('author');

    expect(headline).toHaveTextContent(/test headline/i);
    expect(author).toHaveTextContent(/test author/i);
});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article />);

    const author = screen.getByTestId('author')

    expect(author).toHaveTextContent(/Associated Press/i);
});

test('executes handleDelete when the delete button is pressed', async ()=> {
    resetArticles.mockResolvedValueOnce({
        articles: [
            {id: 1,
                headline: "Test Headline",
                author:"Test Author",
                summary: "Test Summary",
                body: "Test Body"}
        ]
    });

    render(<Article />)

    const deleteButton = screen.getByTestId('deleteButton');
    userEvent.click(deleteButton);

    const articles = await screen.findByTestId("id")
    expect(articles).toHaveLength(0);
});

//Task List: 
//1. Complete all above tests. Create test article data when needed.