using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Commands.Validators
{
    public class EditActivityValidator: BaseActivityValidator<EditActivity.Command, EditActivityDto>
    {
        public EditActivityValidator() : base(x => x.ActivityDto)
        {
            RuleFor(x => x.ActivityDto.Id).NotEmpty().WithMessage("Id must not be null");
        }
    }
}
