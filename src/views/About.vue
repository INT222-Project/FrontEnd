<template>
  <div class="container section pt-14">
    <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-6 mt-80">
            <div class="card bg-white d-flex align-items-center justify-content-center ">
                <div class="w-100"><img src="https://images.pexels.com/photos/7467850/pexels-photo-7467850.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" class="rounded-circle"></div>
                <div class="text-center ">
                    <p class="name">Jason Smith</p>
                    <p class="job">ENGINE MECHANIC</p>
                    <ul class="d-flex align-items-center justify-content-center list-unstyled icons">
                        <li class="icon "><span class="fab fa-twitter"></span></li>
                        <li class="icon mx-2"><span class="fab fa-facebook"></span></li>
                        <li class="icon me-2"><span class="fab fa-google-plus"></span></li>
                        <li class="icon "><span class="fab fa-instagram"></span></li>
                    </ul>
                    <p class="dis pb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur.</p>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6 mt-80">
            <div class="card bg-white d-flex align-items-center justify-content-center">
                <div class="w-100"><img src="https://images.pexels.com/photos/7467850/pexels-photo-7467850.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" class="rounded-circle"></div>
                <div class="text-center ">
                    <p class="name">Jason Smith</p>
                    <p class="job">ENGINE MECHANIC</p>
                    <ul class="d-flex align-items-center justify-content-center list-unstyled icons">
                        <li class="icon "><span class="fab fa-twitter"></span></li>
                        <li class="icon mx-2"><span class="fab fa-facebook"></span></li>
                        <li class="icon me-2"><span class="fab fa-google-plus"></span></li>
                        <li class="icon "><span class="fab fa-instagram"></span></li>
                    </ul>
                    <p class="dis pb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur.</p>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6 mt-80">
            <div class="card bg-white d-flex align-items-center justify-content-center">
                <div class="w-100"><img src="https://images.pexels.com/photos/7467850/pexels-photo-7467850.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" class="rounded-circle"></div>
                <div class="text-center ">
                    <p class="name">Jason Smith</p>
                    <p class="job">ENGINE MECHANIC</p>
                    <ul class="d-flex align-items-center justify-content-center list-unstyled icons">
                        <li class="icon "><span class="fab fa-twitter"></span></li>
                        <li class="icon mx-2"><span class="fab fa-facebook"></span></li>
                        <li class="icon me-2"><span class="fab fa-google-plus"></span></li>
                        <li class="icon "><span class="fab fa-instagram"></span></li>
                    </ul>
                    <p class="dis pb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur.</p>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6 mt-80">
            <div class="card bg-white d-flex align-items-center justify-content-center">
                <div class="w-100"><img src="https://images.pexels.com/photos/7467850/pexels-photo-7467850.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" class="rounded-circle"></div>
                <div class="text-center ">
                    <p class="name">Jason Smith</p>
                    <p class="job">ENGINE MECHANIC</p>
                    <ul class="d-flex align-items-center justify-content-center list-unstyled icons">
                        <li class="icon "><span class="fab fa-twitter"></span></li>
                        <li class="icon mx-2"><span class="fab fa-facebook"></span></li>
                        <li class="icon me-2"><span class="fab fa-google-plus"></span></li>
                        <li class="icon "><span class="fab fa-instagram"></span></li>
                    </ul>
                    <p class="dis pb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur.</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
.section {
  position: relative;
  height: 100vh;
}

* {
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif
}

body {
    background-color: #eee
}

img {
    height: 150px;
    width: 150px;
    border: 8px solid #eee;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%)
}

.card {
    position: relative;
    width: 100%;
    border-radius: 5px;
    border: none
}

.name {
    font-size: 20px;
    margin-bottom: 6px;
    padding-top: 90px
}

.job {
    color: #fa2525;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 8px
}

.container .card .icons .icon {
    font-size: 14px;
    width: 30px;
    height: 30px;
    color: white;
    background-color: #fa2525;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer
}

.dis {
    color: #7e7c7c;
    line-height: 2
}

.container .card:hover .icons .icon {
    background-color: #f06d6d
}

.container .card:hover .text-center {
    background-color: #fa2525;
    color: white
}

.container .card:hover .job,
.container .card:hover .name {
    color: white
}

.container .card:hover .dis {
    color: #c4c4c4
}

.container .card .icons .icon:hover {
    background-color: rgb(235, 123, 103)
}

.mt-80 {
    margin-top: 80px
}
</style>
