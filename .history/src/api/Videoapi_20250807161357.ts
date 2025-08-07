class VideoAPI {
  private static baseUrl = "http://localhost:8080/api/video";

  static getVideoUrl(filename: string): string {
    return `${this.baseUrl}/${filename}`;
  }
}

export default VideoAPI;
