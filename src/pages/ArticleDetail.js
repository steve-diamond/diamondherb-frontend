import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { articlesAPI } from '../services/api';

const ArticleDetail = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useQuery(['article', slug], () =>
    articlesAPI.getBySlug(slug)
  );
  const article = data?.data?.article;

  if (isLoading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (isError || !article)
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">Article not found.</p>
        <Link to="/blog" className="text-green-600 hover:underline">← Back to Blog</Link>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/blog" className="text-green-600 hover:underline mb-4 inline-block">← Back to Blog</Link>
      {article.image && (
        <img src={article.image} alt={article.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      )}
      <h1 className="text-3xl font-bold text-green-800 mb-4">{article.title}</h1>
      <p className="text-gray-500 text-sm mb-6">
        {article.author?.name && `By ${article.author.name} · `}
        {article.createdAt && new Date(article.createdAt).toLocaleDateString()}
      </p>
      <div className="prose prose-green max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
        {article.content}
      </div>
    </div>
  );
};

export default ArticleDetail;
