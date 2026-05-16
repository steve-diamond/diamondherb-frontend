import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { articlesAPI } from '../../services/api';

const AdminArticles = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(['admin-articles'], () => articlesAPI.getAll());
  const articles = data?.data?.articles || [];

  const deleteMutation = useMutation((id) => articlesAPI.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-articles']);
      toast.success('Article deleted.');
    },
    onError: () => toast.error('Failed to delete article.'),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Manage Articles</h1>
      {isLoading ? (
        <p>Loading articles...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Title</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Author</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Date</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {articles.map((article) => (
                <tr key={article._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{article.title}</td>
                  <td className="px-4 py-3 text-gray-600">{article.author?.name || '—'}</td>
                  <td className="px-4 py-3 text-gray-600 text-sm">
                    {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this article?')) {
                          deleteMutation.mutate(article._id);
                        }
                      }}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">No articles found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminArticles;
