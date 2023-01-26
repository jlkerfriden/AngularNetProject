namespace AngularNetProject.Model.DataTransferModels
{
    public class UserLoginResponseDto
    {
        public bool IsSuccess { get; set; }
        public IEnumerable<string>? Errors { get; set; }
        public string? Token { get; set; }
    }
}
