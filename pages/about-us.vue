<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 column">
      <div class="text-center q-flex-grow-1 text-h3 q-pa-md text-secondary">
        About Us
      </div>
      <q-separator class="q-mt-md q-mx-lg" />
      <div
        id="cards"
        class="q-px-md q-mt-md text-body1 q-d-flex row wrap justify-center"
      >
        <q-card id="card" class="q-ma-md col-5">
          <q-card-section>
            <p id="p-outline" class="text-h5 text-secondary">Our Mission</p>
            To be a leader in providing innovative solutions that enhance
            comfort and provide designer flair with our stunning range of
            custom-made window coverings.
          </q-card-section>
        </q-card>
        <q-card id="card" class="q-ma-md col-5">
          <q-card-section>
            <p id="p-outline" class="text-h5 text-secondary">Our Vision</p>
            We are committed to empowering our team to provide premium-quality
            window coverings to our customers and deliver value to stakeholders.
          </q-card-section>
        </q-card>
      </div>
      <div
        id="card-container"
        class="text-body1 row wrap justify-center q-mt-sm"
      >
        <div id="card-group" class="text-body1 row wrap justify-center q-mt-sm">
          <q-card class="col-xl-2 col-lg-2 col-md-3 col-sm-5 col-xs-10">
            <div class="text-h5 text-secondary text-center q-pa-sm q-ma-sm">
              <q-icon name="hourglass_bottom" size="2rem" />
              <span class="q-pa-sm">Our Journey</span>
            </div>
            <q-separator class="q-mx-sm" />
            <q-card-section>
              <p class="text-left q-pa-sm">
                Started as a home-based window coverings company procuring
                products from several shades & blinds manufacturing companies
                across Canada. As time progressed - we did the research, weighed
                price and quality, and established a wide range of best window
                coverings at different price levels that can be customized
                according to the customer's requirements.
              </p>
            </q-card-section>
          </q-card>
          <q-card class="col-xl-2 col-lg-2 col-md-3 col-sm-5 col-xs-10">
            <div class="text-h5 text-secondary text-center q-pa-sm q-ma-sm">
              <q-icon name="verified_user" size="2rem" />
              <span class="q-pa-sm">Our Ethics</span>
            </div>
            <q-separator class="q-mx-sm" />
            <q-card-section>
              <p class="text-left q-pa-sm">
                At Janal Window Covering, we uphold a strict Code of Ethics and
                adhere to industry standards, with a strong commitment to child
                safety. Our window coverings play a vital role in achieving an
                energy-efficient home that prioritizes both daytime illumination
                and nighttime privacy.
              </p>
            </q-card-section>
          </q-card>
          <q-card class="col-xl-2 col-lg-2 col-md-3 col-sm-5 col-xs-10">
            <div class="text-h5 text-secondary text-center q-pa-sm q-ma-sm">
              <q-icon name="blinds_closed" size="2rem" />
              <span class="q-pa-sm">Privacy</span>
            </div>
            <q-separator class="q-mx-sm" />
            <q-card-section>
              <p class="text-left q-pa-sm">
                During the daytime, our window coverings can be effortlessly
                opened, allowing abundant natural light to flood your living
                spaces. When night falls, they provide a shield for your privacy
                and security.
              </p>
            </q-card-section>
          </q-card>
          <q-card class="col-xl-2 col-lg-2 col-md-3 col-sm-5 col-xs-10">
            <div class="text-h5 text-secondary text-center q-pa-sm q-ma-sm">
              <q-icon name="explore" size="2rem" />
              <span class="q-pa-sm">Explore</span>
            </div>
            <q-separator class="q-mx-sm" />
            <q-card-section>
              <p class="text-left q-pa-sm">
                Explore our extensive collection of window blinds, available at
                our custom shop. Our window shutters boast the latest designs
                and styles, all offered at affordable prices. We take pride in
                using locally-sourced materials of the highest caliber, ensuring
                both quality and sustainability.
              </p>
            </q-card-section>
          </q-card>
          <q-card class="col-xl-2 col-lg-2 col-md-3 col-sm-5 col-xs-10">
            <div class="text-h5 text-secondary text-center q-pa-sm q-ma-sm">
              <q-icon name="check_circle" size="2rem" />
              <span class="q-pa-sm">Commitment</span>
            </div>
            <q-separator class="q-mx-sm" />
            <q-card-section>
              <p class="text-left q-pa-sm">
                Rest assured, we've diligently curated and manufactured durable
                blinds across various categories, sparing you the effort. Our
                commitment to excellence means that our window coverings are not
                limited to specific manufacturers or product lines. We've
                undertaken the research, carefully balanced price and quality
                considerations, and curated the finest window covering options
                at different price
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
@Component({
  name: "AboutUsPage",
  template: "default",
})
export class AboutUsPage extends Vue {}

export default toNative(AboutUsPage);
</script>
<style>
.para-start {
  font-style: italic;
  font-weight: 500;
}

.text-body1 {
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

.text-h6 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
}

ul {
  line-height: 1.5em;
  margin: 5px 0 15px;
  padding: 0;
}

li.circle-checkmark {
  position: relative;
  list-style-type: none;
  padding-left: 2rem;

  margin-bottom: 1rem;
  margin-left: 2rem;
}

li.circle-checkmark::before {
  content: "";
  position: absolute;
  left: 0;
  top: 2px;
  border: solid 8px #efd289;
  border-radius: 8px;
}

li.circle-checkmark::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 6px;
  width: 6px;
  height: 6px;
  border: solid #000000;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

#card-group {
  gap: 25px;
}

.my-card {
  width: 250px;
  border-bottom: 2px solid #c89901;
}

#p-outline {
  padding-left: 10px;
  border-left: 2px solid #c89901;
}

@media only screen and (max-width: 767px) {
  #cards {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  #card {
    width: 90%;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .my-card {
    width: 220px;
  }
}
</style>
