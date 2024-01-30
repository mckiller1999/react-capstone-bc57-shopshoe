import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import DeviceTemplate from "./DeviceTemplates";
import BottomTab from "../components/BottomTab";
import "./footer.css";

const HomeTemplates = () => {
  return (
    <div>
      <Header />
      <div
        className="content"
        style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
      >
        <Outlet />
      </div>
      <DeviceTemplate
        Component={
          <footer>
            <header>
              <h2>ShopShoe</h2>
              <p>
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Omnis, accusantium?"
              </p>
              <ul class="icons">
                <ion-icon class="icon" name="logo-facebook"></ion-icon>
                <ion-icon class="icon" name="logo-instagram"></ion-icon>
                <ion-icon class="icon" name="logo-twitter"></ion-icon>
                <ion-icon class="icon" name="logo-youtube"></ion-icon>
              </ul>
            </header>
            <aside>
              <ul class="category">
                <li>
                  <h3>Project</h3>
                </li>
                <li>Houses</li>
                <li>Rooms</li>
                <li>Flats</li>
                <li>Apartments</li>
              </ul>
              <ul class="category">
                <li>
                  <h3>Company</h3>
                </li>
                <li>Objective</li>
                <li>Capital</li>
                <li>Security</li>
                <li>Selling</li>
              </ul>
              <ul class="category">
                <li>
                  <h3>Movement</h3>
                </li>
                <li>Movement</li>
                <li>Support us</li>
                <li>Pricing</li>
                <li>Renting</li>
              </ul>
              <ul class="category">
                <li>
                  <h3>Help</h3>
                </li>
                <li>Privacy</li>
                <li>Contact</li>
                <li>FAQs</li>
                <li>Blog</li>
              </ul>
            </aside>
          </footer>
        }
        MobileComponent={<BottomTab />}
      />
    </div>
  );
};

export default HomeTemplates;
