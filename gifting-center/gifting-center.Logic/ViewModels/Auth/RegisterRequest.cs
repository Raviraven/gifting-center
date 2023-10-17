namespace gifting_center.Logic.ViewModels.Auth
{
    public class RegisterRequest
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public RegisterRequest()
        {
            this.Username = null!;
            this.Password = null!;
            this.Email = null!;
        }
    }
}