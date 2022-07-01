using Microsoft.EntityFrameworkCore;

namespace aspnetserver.Data
{
    internal static class PostsRepository
    {
        internal async static Task<List<Post>> GetPostsAsync() // CRUD Read
        {
            using (var db = new AppDbContext())
            {
                return await db.Posts.ToListAsync();
            }
        }
        internal static async Task<Post?> GetPostByIdAsync(int id) //CRUD Read
        {
            using (var db = new AppDbContext())
            {
                return await (from posts in db.Posts
                              where posts.PostId == id
                              select posts).FirstOrDefaultAsync();
            }
        }
        internal static async Task<bool> CreatePostAsync(Post newPost) //CRUD Create
        {
            using (var db = new AppDbContext())
            {
                try
                {
                    db.Posts.Add(newPost);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }
        internal static async Task<bool> UpdatePostAsync(Post selectedPost) //CRUD Update
        {
            using (var db = new AppDbContext())
            {
                try
                {
                    db.Posts.Update(selectedPost);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }
        internal static async Task<bool> DeletePostAsync(int postId) //CRUD Delete
        {
            using (var db = new AppDbContext())
            {
                try
                {
                    var post = await GetPostByIdAsync(postId);
                    db.Posts.Remove(post);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

    }
}
