import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { UserService } from '../../_service/user.service';

@Component({
  selector: 'app-home',
  standalone: true, // If you're using a standalone component
  imports: [CommonModule], // Include CommonModule
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any[] = []; // Array to hold user data

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Fetch users when the component initializes
    this.userService.Getallusers().subscribe(
      (response: { data: any[]; }) => {
        this.users = response.data; // Store the user data
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
