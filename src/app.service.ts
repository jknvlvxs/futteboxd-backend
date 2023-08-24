import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Futteboxd API</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
    
            header {
                background-color: #333;
                color: #fff;
                padding: 10px 0;
                text-align: center;
            }
    
            h1 {
                margin: 0;
            }
    
            .container {
                max-width: 800px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            }
    
            .movie {
                border: 1px solid #ddd;
                padding: 10px;
                margin-bottom: 10px;
                border-radius: 5px;
                display: flex;
                flex-direction: row;
                align-items: center;
            }
    
            .movie img {
                max-width: 100px;
                margin-right: 10px;
            }
    
            .movie h2 {
                margin: 0;
            }
        </style>
    </head>
    <body>
        <header>
            <h1>Futteboxd API</h1>
        </header>
        <div class="container">
            <div class="movie">
                <img src="https://icon-library.com/images/user-icon-jpg/user-icon-jpg-28.jpg" alt="Users">
                <div>
                    <h2>Users</h2>
                    <p>POST /user</p>
                    <p>GET /user/(id)</p>
                </div>
            </div>
            <div class="movie">
                <img src="https://icon-library.com/images/user-icon-jpg/user-icon-jpg-28.jpg" alt="Profile">
                <div>
                    <h2>Profile</h2>
                    <p>GET /profile/(id)</p>
                </div>
            </div>
            <!-- Adicione mais filmes conforme necessário -->
        </div>
    </body>
    </html>
    `;
  }
}
