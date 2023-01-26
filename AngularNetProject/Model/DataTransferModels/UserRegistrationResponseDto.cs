namespace AngularNetProject.Model.DataTransferModels
{
    public class UserRegistrationResponseDto
    {
        public bool IsSuccess { get; set; }
        public IEnumerable<string>? Errors { get; set; }
    }
}
