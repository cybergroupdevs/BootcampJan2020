﻿using System;
using System.Collections.Generic;

namespace company.DbModels
{
    public partial class UsersInfo
    {
        public int EmpId { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string ProjectId { get; set; }
    }
}