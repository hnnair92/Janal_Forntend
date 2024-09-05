<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 row wrap justify-center">
      <div class="col-xl-10 col-md-12 q-pa-md q-d-flex q-flex-grow-1 column">
        <div class="text-center q-flex-grow-1 text-h3 q-pa-md text-secondary">
          Contact Us
        </div>
        <div class="text-center q-flex-grow-1 text-h6 text-secondary">
          Got Queries? Reach out!
        </div>
        <q-separator class="q-my-md" />
        <div class="row q-d-flex q-flex-grow-1" style="width: 100%">
          <div id="contact-cards" class="q-pa-md">
            <q-card flat bordered class="my-card">
              <q-card-section>
                Thank you for considering Janal for all your window covering
                needs. We value your interest and look forward to assisting you.
              </q-card-section>
            </q-card>
            <q-card flat bordered class="my-card q-mt-md">
              <q-card-section>
                <div class="text-h6 q-ma-sm text-secondary">
                  Customer Support
                </div>
                <q-separator class="q-ma-sm" />
                <div class="q-mx-sm q-mt-md">
                  If you have questions about our products, need assistance with
                  an existing order, or require help with measurements and
                  customization, our dedicated customer support team is here to
                  assist you. There are several ways to get in touch with us:
                </div>
              </q-card-section>
              <div class="q-pa-md">
                <q-card flat bordered class="q-pa-sm">
                  <q-icon
                    name="phone"
                    size="sm"
                    class="q-mr-sm"
                    color="secondary"
                  />
                  Phone: (519) 341-4767
                </q-card>
                <q-card flat bordered class="q-pa-sm q-mt-sm">
                  <q-icon
                    name="mail"
                    size="sm"
                    class="q-mr-sm"
                    color="secondary"
                  />
                  Email: info@janal.ca
                </q-card>
                <q-card flat bordered class="q-pa-sm q-mt-sm">
                  <q-icon
                    name="schedule"
                    size="sm"
                    class="q-mr-sm"
                    color="secondary"
                  />
                  Hours of Operation: 9.30 AM - 5:30 PM EST</q-card
                >
              </div>
            </q-card>
            <q-card flat bordered class="my-card q-mt-md">
              <q-card-section>
                <div class="text-h6 q-ma-sm text-secondary">
                  Schedule a Virtual Consultation
                </div>
                <q-separator class="q-ma-sm" />
                <div class="q-ma-sm">
                  For a personalized window covering consultation, you can
                  schedule an virtual appointment with one of our experienced
                  design experts. They can assist you in choosing the perfect
                  window treatments to match your style and needs.
                </div>
              </q-card-section>
              <q-separator dark />
            </q-card>
            <q-card flat bordered class="my-card q-mt-md">
              <q-card-section>
                <div class="text-h6 q-ma-sm text-secondary">
                  Appointment Booking
                </div>
                <q-separator class="q-ma-sm" />
                <div class="q-ma-sm">Email us to schedule an appointment.</div>
              </q-card-section>
              <q-separator dark />
            </q-card>
          </div>
          <div id="contact-form" class="q-pa-md">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-ma-sm text-secondary">Contact Form</div>
                <q-separator class="q-ma-sm" />
                <div class="q-ma-sm">
                  You can also reach out to us by filling out our online contact
                  form. Please provide us with your details and a brief message,
                  and we'll respond to your inquiry as soon as possible.
                </div>
              </q-card-section>
              <div class="q-px-lg">
                <q-form ref="contactForm" @submit="onSubmit" @reset="onReset">
                  <q-input
                    ref="nameRef"
                    v-model="formData.name"
                    color="secondary"
                    outlined
                    clearable
                    clear-icon="close"
                    type="text"
                    label="Name"
                    lazy-rules
                    :rules="validationRules.name"
                    class="q-mb-md"
                  />

                  <q-input
                    ref="phoneRef"
                    v-model="formData.phone"
                    color="secondary"
                    outlined
                    clearable
                    clear-icon="close"
                    type="tel"
                    label="Phone Number"
                    lazy-rules
                    :rules="validationRules.phone"
                    class="q-mb-md"
                    :maxlength="10"
                  />

                  <q-input
                    ref="emailRef"
                    v-model="formData.email"
                    color="secondary"
                    outlined
                    clearable
                    clear-icon="close"
                    type="email"
                    label="Email"
                    lazy-rules
                    :rules="validationRules.email"
                    class="q-mb-md"
                  />

                  <q-input
                    id="textarea"
                    ref="messageRef"
                    v-model="formData.message"
                    color="secondary"
                    outlined
                    label="Message"
                    type="textarea"
                    lazy-rules
                    :rules="validationRules.message"
                    class="q-mb-md"
                  />

                  <NuxtTurnstile
                    v-model="token"
                    :options="{
                      theme: 'light',
                    }"
                  />

                  <div class="q-pb-md q-mt-lg">
                    <q-btn
                      label="Submit"
                      type="submit"
                      color="secondary"
                      :loading="submittingForm"
                    />
                    <q-btn
                      label="Reset"
                      type="reset"
                      color="secondary"
                      flat
                      class="q-ml-sm"
                    />
                  </div>
                </q-form>
              </div>
            </q-card>
          </div>
        </div>
        <div class="row q-d-flex q-flex-grow-1" style="width: 100%">
          <q-card flat bordered class="my-card q-ma-sm">
            <q-card-section>
              <div class="text-h6 q-ma-sm text-secondary">Connect with us</div>
              <q-separator class="q-ma-sm" />
              <div class="q-ma-sm">
                <div>
                  Stay updated on the latest trends, promotions, and inspiration
                  by following us on our social media channels. Feel free to
                  send us a message or tag us in your home decor projects.
                </div>
                <div class="q-mt-sm">
                  We appreciate your interest in Janal. Our team is dedicated to
                  providing you with high-quality window coverings and
                  exceptional service. Please don't hesitate to reach out if you
                  have any questions or need assistance. We're here to help you
                  transform your windows into stunning focal points for your
                  home.
                </div>
                <div class="q-mt-sm">Thank you for choosing!</div>
                <q-separator class="q-ma-sm" />
                <div class="row justify-center">
                  <img
                    class="q-mr-sm"
                    alt="svgImg"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiMwMzliZTUiIGQ9Ik0yNCA1QTE5IDE5IDAgMSAwIDI0IDQzQTE5IDE5IDAgMSAwIDI0IDVaIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI2LjU3MiwyOS4wMzZoNC45MTdsMC43NzItNC45OTVoLTUuNjl2LTIuNzNjMC0yLjA3NSwwLjY3OC0zLjkxNSwyLjYxOS0zLjkxNWgzLjExOXYtNC4zNTljLTAuNTQ4LTAuMDc0LTEuNzA3LTAuMjM2LTMuODk3LTAuMjM2Yy00LjU3MywwLTcuMjU0LDIuNDE1LTcuMjU0LDcuOTE3djMuMzIzaC00LjcwMXY0Ljk5NWg0LjcwMXYxMy43MjlDMjIuMDg5LDQyLjkwNSwyMy4wMzIsNDMsMjQsNDNjMC44NzUsMCwxLjcyOS0wLjA4LDIuNTcyLTAuMTk0VjI5LjAzNnoiPjwvcGF0aD4KPC9zdmc+"
                  />

                  <img
                    class="q-mr-sm"
                    alt="svgImg"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCI+CjxwYXRoIGQ9Ik0gMTEgNCBDIDcuMTM0IDQgNCA3LjEzNCA0IDExIEwgNCAzOSBDIDQgNDIuODY2IDcuMTM0IDQ2IDExIDQ2IEwgMzkgNDYgQyA0Mi44NjYgNDYgNDYgNDIuODY2IDQ2IDM5IEwgNDYgMTEgQyA0NiA3LjEzNCA0Mi44NjYgNCAzOSA0IEwgMTEgNCB6IE0gMTMuMDg1OTM4IDEzIEwgMjEuMDIzNDM4IDEzIEwgMjYuNjYwMTU2IDIxLjAwOTc2NiBMIDMzLjUgMTMgTCAzNiAxMyBMIDI3Ljc4OTA2MiAyMi42MTMyODEgTCAzNy45MTQwNjIgMzcgTCAyOS45Nzg1MTYgMzcgTCAyMy40Mzc1IDI3LjcwNzAzMSBMIDE1LjUgMzcgTCAxMyAzNyBMIDIyLjMwODU5NCAyNi4xMDM1MTYgTCAxMy4wODU5MzggMTMgeiBNIDE2LjkxNDA2MiAxNSBMIDMxLjAyMTQ4NCAzNSBMIDM0LjA4NTkzOCAzNSBMIDE5Ljk3ODUxNiAxNSBMIDE2LjkxNDA2MiAxNSB6Ij48L3BhdGg+Cjwvc3ZnPg=="
                  />

                  <img
                    alt="svgImg"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxyYWRpYWxHcmFkaWVudCBpZD0ieU9ybm5obGlDcmRTMmd5fjR0RDhtYV9YeTEwSmN1MUwyU3VfZ3IxIiBjeD0iMTkuMzgiIGN5PSI0Mi4wMzUiIHI9IjQ0Ljg5OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZkNSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjMyOCIgc3RvcC1jb2xvcj0iI2ZmNTQzZiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjM0OCIgc3RvcC1jb2xvcj0iI2ZjNTI0NSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjUwNCIgc3RvcC1jb2xvcj0iI2U2NDc3MSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjY0MyIgc3RvcC1jb2xvcj0iI2Q1M2U5MSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjc2MSIgc3RvcC1jb2xvcj0iI2NjMzlhNCI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjg0MSIgc3RvcC1jb2xvcj0iI2M4MzdhYiI+PC9zdG9wPjwvcmFkaWFsR3JhZGllbnQ+PHBhdGggZmlsbD0idXJsKCN5T3JubmhsaUNyZFMyZ3l+NHREOG1hX1h5MTBKY3UxTDJTdV9ncjEpIiBkPSJNMzQuMDE3LDQxLjk5bC0yMCwwLjAxOWMtNC40LDAuMDA0LTguMDAzLTMuNTkyLTguMDA4LTcuOTkybC0wLjAxOS0yMAljLTAuMDA0LTQuNCwzLjU5Mi04LjAwMyw3Ljk5Mi04LjAwOGwyMC0wLjAxOWM0LjQtMC4wMDQsOC4wMDMsMy41OTIsOC4wMDgsNy45OTJsMC4wMTksMjAJQzQyLjAxNCwzOC4zODMsMzguNDE3LDQxLjk4NiwzNC4wMTcsNDEuOTl6Ij48L3BhdGg+PHJhZGlhbEdyYWRpZW50IGlkPSJ5T3JubmhsaUNyZFMyZ3l+NHREOG1iX1h5MTBKY3UxTDJTdV9ncjIiIGN4PSIxMS43ODYiIGN5PSI1LjU0IiByPSIyOS44MTMiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLjY2NjMgMCAxLjg0OSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM0MTY4YzkiPjwvc3RvcD48c3RvcCBvZmZzZXQ9Ii45OTkiIHN0b3AtY29sb3I9IiM0MTY4YzkiIHN0b3Atb3BhY2l0eT0iMCI+PC9zdG9wPjwvcmFkaWFsR3JhZGllbnQ+PHBhdGggZmlsbD0idXJsKCN5T3JubmhsaUNyZFMyZ3l+NHREOG1iX1h5MTBKY3UxTDJTdV9ncjIpIiBkPSJNMzQuMDE3LDQxLjk5bC0yMCwwLjAxOWMtNC40LDAuMDA0LTguMDAzLTMuNTkyLTguMDA4LTcuOTkybC0wLjAxOS0yMAljLTAuMDA0LTQuNCwzLjU5Mi04LjAwMyw3Ljk5Mi04LjAwOGwyMC0wLjAxOWM0LjQtMC4wMDQsOC4wMDMsMy41OTIsOC4wMDgsNy45OTJsMC4wMTksMjAJQzQyLjAxNCwzOC4zODMsMzguNDE3LDQxLjk4NiwzNC4wMTcsNDEuOTl6Ij48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI0LDMxYy0zLjg1OSwwLTctMy4xNC03LTdzMy4xNDEtNyw3LTdzNywzLjE0LDcsN1MyNy44NTksMzEsMjQsMzF6IE0yNCwxOWMtMi43NTcsMC01LDIuMjQzLTUsNQlzMi4yNDMsNSw1LDVzNS0yLjI0Myw1LTVTMjYuNzU3LDE5LDI0LDE5eiI+PC9wYXRoPjxjaXJjbGUgY3g9IjMxLjUiIGN5PSIxNi41IiByPSIxLjUiIGZpbGw9IiNmZmYiPjwvY2lyY2xlPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zMCwzN0gxOGMtMy44NTksMC03LTMuMTQtNy03VjE4YzAtMy44NiwzLjE0MS03LDctN2gxMmMzLjg1OSwwLDcsMy4xNCw3LDd2MTIJQzM3LDMzLjg2LDMzLjg1OSwzNywzMCwzN3ogTTE4LDEzYy0yLjc1NywwLTUsMi4yNDMtNSw1djEyYzAsMi43NTcsMi4yNDMsNSw1LDVoMTJjMi43NTcsMCw1LTIuMjQzLDUtNVYxOGMwLTIuNzU3LTIuMjQzLTUtNS01SDE4eiI+PC9wYXRoPgo8L3N2Zz4="
                  />
                </div>
              </div>
            </q-card-section>
            <q-separator dark />
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Ref, toNative } from "vue-facing-decorator";
import { PublicService } from "@/openapi";
@Component({
  name: "ContactUsPage",
  template: "default",
})
export class ContactUsPage extends Vue {
  formData = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  submittingForm: boolean = false;
  formValid: boolean = true;
  token = "";

  validationRules = {
    name: [
      (val: any) => !!val || "Name is required",
      (val: any) =>
        (val && val.length >= 3) || "Name must be at least 3 characters",
      (val: any) =>
        (val && /^[a-zA-Z\s]*$/.test(val)) ||
        "Name must contain only letters and spaces",
    ],
    phone: [
      (val: any) => !!val || "Phone number is required",
      (val: any) =>
        /^\d+$/.test(val) || "Phone number must contain only digits",
      (val: any) => /^\d{10}$/.test(val) || "Phone number must be 10 digits",
    ],
    email: [
      (val: any) => !!val || "Email is required",
      (val: any) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || "Invalid email address",
    ],
    message: [
      (val: any) => !!val.trim() || "Message is required",
      (val: any) =>
        /\S/.test(val) || "Message must contain non-whitespace characters",
      (val: any) => {
        const words = val.trim().split(/\s+/);
        return words.length >= 3 || "Message must contain at least three words";
      },
      (val: any) => {
        const words = val.trim().split(/\s+/);
        return words.length <= 500 || "Message must not exceed 500 words";
      },
    ],
  };

  async onSubmit() {
    await $fetch("/api/validateTurnstile", {
      method: "POST",
      body: {
        token: this.token,
      },
    }).then((res: any) => {
      if (res.success) {
        this.submitForm();
      }
    });
  }

  submitForm() {
    (this as any).$refs.nameRef.validate();
    (this as any).$refs.emailRef.validate();
    (this as any).$refs.phoneRef.validate();
    (this as any).$refs.messageRef.validate();
    if (
      (this as any).$refs.nameRef.hasError ||
      (this as any).$refs.emailRef.hasError ||
      (this as any).$refs.phoneRef.hasError ||
      (this as any).$refs.messageRef.hasError
    ) {
      (this as any).$q.notify({
        message: "Please fill in all the required fields.",
        color: "red",
        position: "top",
        classes: "text-body1",
      });
      return;
    }

    this.submittingForm = true;
    PublicService.publicContactUsCreate({
      name: this.formData.name,
      email: this.formData.email,
      phone_number: this.formData.phone,
      message: this.formData.message,
    })
      .then(() => {
        this.$q.notify({
          message: "Form submitted successfully. We will contact you shortly!",
          color: "green",
          position: "top",
          classes: "text-body1",
        });
        (this as any).$refs.contactForm.resetValidation();
      })
      .catch(() => {
        this.$q.notify({
          message: "Error submitting form. Please try again!",
          color: "red",
          position: "top",
          classes: "text-body1",
        });
      });
    this.submittingForm = false;
    this.onReset();
  }

  onReset() {
    this.formData = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };
  }
}
export default toNative(ContactUsPage);
</script>
<style scoped>
.my-card {
  width: 100%;
}

img:hover {
  cursor: pointer;
}

#contact-cards {
  width: 50%;
}

#contact-form {
  width: 50%;
}

@media only screen and (max-width: 767px) {
  #contact-cards {
    width: 100%;
  }

  #contact-form {
    width: 100%;
  }
}
</style>
