<template>
    <div class="container my-5 pt-20">
    <form action="controller" method="get" class="d-md-flex d-sm-block justify-content-between"> <input type="hidden" name="command" value="select-orders">
        <h1 class="h5 align-self-center col-3">Search Order</h1>
        <div class="btn-group align-self-center col-12 col-sm-12 col-md-8 col-lg-6"> <select name="searchType" class="btn btn-outline-dark col-3 col-sm-3">
                <option value="orderId">Order ID</option>
                <option value="created">Customer</option>
                <option value="customer">Receptionist</option>
            </select> <input type="search" name="searchBy" class="col-6 col-sm-6"> <input type="submit" value="Search" class="btn btn-outline-dark col-3 col-sm-3"> </div>
    </form>
    <!-- {{this.users}} -->
    <div class="d-md-flex d-none justify-content-md-between justify-content-sm-center align-content-center border-bottom border-2 my-2 bg-dark text-light p-3 rounded-3">
        <div class="col-2 text-sm-center text-md-start align-self-center">
            <h1 class="h5 fw-bold">User ID</h1>
        </div>
        <div class="col-2 align-self-center">
            <h1 class="h5 fw-bold">Email</h1>
        </div>
        <div class="col-3 align-self-center">
            <h1 class="h5 fw-bold">Customer</h1>
        </div>
        <div class="col-2 align-self-center">
            <h1 class="h5 fw-bold">Show details</h1>
        </div>
        <div class="col-2 align-self-center">
            <h1 class="h5 fw-bold">Role</h1>
        </div>
    </div>
    <div v-for="(item,index) in users" :key="index"  class="d-md-flex d-sm-block justify-content-md-between justify-content-sm-center text-center border-bottom border-2 my-2 bg-light p-2 rounded-3">
        <div class="col-md-2 text-sm-center text-md-start align-self-center my-2">
            <h1 v-if="item.role[0].authority == 'customer'" class="h6">{{item.authenticationUser.customerId}}</h1>
            <h1 v-if="item.role[0].authority == 'receptionist'" class="h6">{{item.authenticationUser.repId}}</h1>
        </div>
        <div class="col-md-2 text-sm-center text-md-start align-self-center my-2">
            <h1  class="h6">{{item.authenticationUser.email}}</h1>
        </div>
        <div class="col-md-3 text-sm-center text-md-start align-self-center my-2">
            <h1 v-if="item.role[0].authority == 'customer'" class="h6">{{item.authenticationUser.fname}} {{item.authenticationUser.lname}}</h1>
            <h1 v-if="item.role[0].authority == 'receptionist'" class="h6">{{item.authenticationUser.fName}} {{item.authenticationUser.lName}}</h1>
        </div>
        <div class="col-md-2 text-sm-center text-md-start align-self-center my-2"> <a class="btn btn-outline-dark w-100" href="#">Details</a> </div>
        <div class="col-md-2 text-sm-center text-md-start align-self-center my-2">
            <form method="get" action="controller" class="d-flex btn-group"> <input type="hidden" name="command" value="refresh-order-status"> <select name="status" class="btn btn-outline-dark">
                    <option value="customer" class="form-select-button">Customer</option>
                    <option value="receptionist" class="form-select-button">Receptionist</option>
                </select> <input type="submit" class="btn btn-outline-dark" value="OK"> 
            </form>
        </div>
    </div>
</div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
    data(){
        return{

        }
    },
    setup() {
    const store = useStore();
    store.dispatch("getAllUsers");
    let users = computed(function () {
      return store.state.users;
    });
    return {
        users
    }
    },
}
</script>