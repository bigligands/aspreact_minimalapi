using aspnetserver.Data;

namespace aspnetserver
{
    public class Map
    {
        private WebApplication _app { get; }
        public Map(WebApplication app)
        {
            _app = app;            
        }
        public void SetMaps()
        {
            Gets();
            Posts();
            Puts();
            Deletes();
        }
        private void Gets()
        {
            _app.MapGet("/get-all-posts", async () => await PostsRepository.GetPostsAsync())
                .WithTags("Posts Endpoints");

            _app.MapGet("/get-posts-by-id/{postId}", async (int postId) => //anonymous function for Delegate handler
            {
                var post = await PostsRepository.GetPostByIdAsync(postId);
                if (post != null)
                {
                    return Results.Ok(post);
                }
                return Results.BadRequest();
            }).WithTags("Posts Endpoints");
        }
        
        private void Posts()
        {
            _app.MapPost("/create-post", async (Post newPost) =>
            {
                bool successful = await PostsRepository.CreatePostAsync(newPost);
                if (successful)
                {
                    return Results.Ok("Created Post");
                }
                else
                {
                    return Results.BadRequest();
                }

            }).WithTags("Posts Endpoints");
        }

        private void Puts()
        {
            _app.MapPut("/update-post", async (Post post) =>
            {
                bool successful = await PostsRepository.UpdatePostAsync(post);
                if (successful)
                {
                    return Results.Ok("Updated Post");
                }
                return Results.BadRequest();
            }).WithTags("Posts Endpoints");
        }

        private void Deletes()
        {
            _app.MapDelete("/delete-post-by-id/{id}", async (int id) =>
            {
                var successful = await PostsRepository.DeletePostAsync(id);
                if (successful)
                {
                    return Results.Ok("Deleted Post");
                }
                return Results.BadRequest();
            }).WithTags("Posts Endpoints");
        }
    }
}



