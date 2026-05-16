import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { articlesAPI } from '../services/api';

const Blog = () => {
  const { data, isLoading } = useQuery(['articles'], () => articlesAPI.getAll());
  const articles = data?.data?.articles || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Health & Wellness Blog</h1>
      {isLoading ? (
        <p>Loading articles...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article._id} className="bg-white rounded-lg shadow overflow-hidden">
              {article.image && (
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                <Link
                  to={`/blog/${article.slug}`}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
          {articles.length === 0 && (
            <p className="text-gray-500 col-span-3">No articles available yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
