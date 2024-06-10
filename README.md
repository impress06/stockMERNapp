# Proje Adı: MERN Stack Giriş Sistemi

## Özellikler

### Türkçe
- **Proje**: MERN stack giriş sistemi.
- **Kullanıcı Kayıt**: Üyelik oluşturunca otomatik yönlendirme ve üye olunan maile hesap gönderme.
- **Şifre Sıfırlama**: "Şifremi unuttum" tıklayınca kod gönderme ve bu kodla şifre değiştirme.
- **Stil**: Pure CSS, Material UI ve TailwindCSS kullanılmıştır.
- **Form Doğrulama**: Formik ve Yup kullanılmıştır.
- **Giriş Yaptıktan Sonra**: Üç ayrı bilgi tutulur:
  - Cookie (Eğer "beni hatırla" işaretlenirse, 3 gün sınırlı)
  - SimpleToken
  - JWT token (şu an pasif, istenirse aktif hale getirilebilir)
- **Global State**: Gelen token global reducer'da tutulur ve persist ile kaybolması engellenir.
- **İstekler**: Axios instance kullanılmış, requestler ve headerlar bir yerde toplanmıştır.
- **Backend**: Node.js ve Express.js kullanılmıştır.
- **Loglama**: Site, morgan modülü ile log tutmaktadır.
- **Dosya Yükleme**: Multer modülü ile dosya yüklenmektedir.
- **Swagger**: Swagger dokümantasyonu `fullstacktema.org/documents/swagger` adresindedir.
- **Şifre Kontrolü**: Middleware düzeyinde yapılmaktadır.
- **Permissionlar**: Şu an aktif değildir ama yazılmıştır (disabled).
- **Pagination**: Gerçek zamanlıdır, tüm veriler frontende yüklenip frontendde yapılmamaktadır, API'den parçalı çekilmektedir.
- **Filtreleme, Sıralama ve Arama**: Tam anlamıyla çalışmakta, arama gerçek zamanlı gerçekleşmektedir.
- **Responsive**: Tamamen responsivedir.
- **Fatura Oluşturma**: Sales ve Purchase kısmında fatura oluşturulmaktadır, istenirse mobil ödeme eklenebilir.
- **Uyarılar**: Toast kullanılmıştır.
- **Dashboard**: Özel KPI yazılmıştır ve Recharts kütüphanesi ile grafikler çizdirilmiştir.
- **ERD Diyagramı**: Proje içine eklenmiştir.
- **NotFound Sayfası**: Eklenmiştir.

### English
- **Project**: MERN stack authentication system.
- **User Registration**: Automatic redirection after creating an account and sending an account activation email.
- **Password Reset**: Sends a code when "Forgot Password" is clicked, and this code can be used to reset the password.
- **Styling**: Utilizes Pure CSS, Material UI, and TailwindCSS.
- **Form Validation**: Implemented with Formik and Yup.
- **Post-Login**: Stores three types of information:
  - Cookie (if "remember me" is checked, limited to 3 days)
  - SimpleToken
  - JWT token (currently inactive, can be activated if desired)
- **Global State**: The received token is stored in a global reducer and prevented from being lost using persist.
- **Requests**: Axios instance is used, and requests and headers are centralized.
- **Backend**: Built with Node.js and Express.js.
- **Logging**: The site logs with the morgan module.
- **File Upload**: Files are uploaded using the multer module.
- **Swagger**: Swagger documentation is available at `fullstacktema.org/documents/swagger`.
- **Password Control**: Implemented at the middleware level.
- **Permissions**: Currently inactive but written (disabled).
- **Pagination**: Real-time, data is fetched in chunks from the API rather than loading all data to the frontend.
- **Filtering, Sorting, and Searching**: Fully functional, with real-time search.
- **Responsive**: Fully responsive design.
- **Invoice Creation**: Invoices are created in the Sales and Purchase sections, with the option to add mobile payments.
- **Notifications**: Toast is used for alerts.
- **Dashboard**: A custom KPI has been written and charts are drawn with the Recharts library.
- **ERD Diagram**: Included in the project.
- **NotFound Page**: Added.

## Kurulum / Installation

### Türkçe
1. Depoyu klonlayın:
    ```bash
    git clone https://github.com/kullanici/proje.git
    ```
2. Gerekli paketleri yükleyin:
    ```bash
    cd proje
    npm install
    ```
3. .env dosyasını oluşturun ve gerekli ortam değişkenlerini ekleyin.

4. Uygulamayı başlatın:
    ```bash
    npm run dev
    ```

### English
1. Clone the repository:
    ```bash
    git clone https://github.com/username/project.git
    ```
2. Install the necessary packages:
    ```bash
    cd project
    npm install
    ```
3. Create a .env file and add the required environment variables.

4. Start the application:
    ```bash
    npm run dev
    ```

## Kullanılan Teknolojiler / Technologies Used

- **Frontend**: React, Pure CSS, Material UI, TailwindCSS, Formik, Yup
- **Backend**: Node.js, Express.js, Multer, Morgan
- **State Management**: Redux, Persist
- **HTTP Requests**: Axios
- **Documentation**: Swagger
- **Notifications**: Toast
- **Charts**: Recharts

## Katkıda Bulunma / Contributing

### Türkçe
Katkıda bulunmak için lütfen bir pull request gönderin veya bir issue açın.

### English
Please send a pull request or open an issue to contribute.

## Lisans / License

Bu proje MIT lisansı ile lisanslanmıştır. / This project is licensed under the MIT License.
