package config

import (
	"blog-backend/entity"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Config is a struct for config configuration
// SetupDB is a function to setup config connection
func SetupDB() *gorm.DB {
	errEnv := godotenv.Load()
	if errEnv != nil {
		panic("Failed to load env file")
	}

	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")
	dbName := os.Getenv("DB_NAME")

	// Update the DSN to match PostgreSQL format
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=5432 sslmode=disable", dbHost, dbUser, dbPass, dbName)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{DisableForeignKeyConstraintWhenMigrating: false})

	if err != nil {
		panic(fmt.Sprintf("Failed to create a connection to config: %v", err))
	}
	db.AutoMigrate(&entity.User{}, &entity.Post{}, &entity.Topic{}, &entity.Comment{}, &entity.Follower{}, &entity.Like{}, &entity.Subscribe{})
	return db
}

// CloseDB is a function to close config connection
func CloseDB(db *gorm.DB) {
	dbSQL, err := db.DB()
	if err != nil {
		fmt.Printf("Failed to close connection to config: %v", err)
	}
	dbSQL.Close()
}
