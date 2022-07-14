<template>
    <div>
        <v-container class="category-card-spacer">
            <!-- -----------------------------------------------
					Start Category Card
			----------------------------------------------- -->
            <v-row>
                <v-col cols="12" class="py-2">
                    <v-tabs
                        class="profile-tab"
                        color="primary"
                        show-arrows
                        slider-color="transparent"
                        v-model="tab"
                    >
                        <v-tab class="text-capitalize ml-0">Account Info</v-tab>
                        <v-tab class="text-capitalize">Social Info</v-tab>
                        <!-- <v-tab class="text-capitalize">Topics you know</v-tab> -->
                        <v-tab class="text-capitalize">Change Password</v-tab>
                        <div class="ml-auto">
                            <v-btn
                                @click="answerClicked = true"
                                class="d-none d-lg-flex btn-hover mt-10"
                                color="primary"
                                elevation="0"
                            >
                                Ask Question
                            </v-btn>
                        </div>
                    </v-tabs>
                    <v-row>
                        <v-col cols="12" md="12" lg="8" class="mt-12">
                            <v-tabs-items v-model="tab">
                                <v-tab-item>
                                    <v-container
                                        fluid
                                        class="px-0 px-md-8 py-0 py-lg-8"
                                    >
                                        <v-row>
                                            <v-col md="12">
                                                <v-card
                                                    class="ask-question-banner mb-10 no-underline elevation-0 border-all w-100"
                                                    v-if="answerClicked"
                                                >
                                                    <div
                                                        class="browser-actions"
                                                    >
                                                        <v-icon color="error"
                                                            >mdi-brightness-1</v-icon
                                                        >
                                                        <v-icon color="warning"
                                                            >mdi-brightness-1</v-icon
                                                        >
                                                        <v-icon color="success"
                                                            >mdi-brightness-1</v-icon
                                                        >
                                                    </div>
                                                    <v-textarea
                                                        name="askquestion"
                                                        placeholder="Ask a Question"
                                                        rows="3"
                                                        class="font-weight-semibold text-blue"
                                                        no-resize
                                                    ></v-textarea>
                                                    <div class="text-right">
                                                        <v-btn color="primary"
                                                            >Ask</v-btn
                                                        >
                                                    </div>
                                                </v-card>
                                                <v-card
                                                    class="question-card elevation-0 border-all"
                                                >
                                                    <v-card-text>
                                                        <v-form
                                                            @submit.prevent="
                                                                accSave
                                                            "
                                                            ref="acc"
                                                        >
                                                            <div
                                                                class="pb-6 mb-12 border-bottom d-flex align-center"
                                                            >
                                                                <v-icon
                                                                    class="mr-4 font-18"
                                                                    >mdi-account-circle</v-icon
                                                                >
                                                                <h4
                                                                    class="mb-0 font-18"
                                                                >
                                                                    Edit
                                                                    Personal
                                                                    Information
                                                                </h4>
                                                            </div>
                                                            <v-row
                                                                class="mt-12 pt-6"
                                                            >
                                                                <v-col
                                                                    cols="12"
                                                                    md="6"
                                                                    class="py-0"
                                                                >
                                                                    <label
                                                                        class="font-weight-semibold font-18 text-blue"
                                                                        >First
                                                                        Name</label
                                                                    >
                                                                    <v-text-field
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="John"
                                                                        v-model="
                                                                            profileData.first_name
                                                                        "
                                                                        outlined
                                                                        :rules="[v => !!v || 'Firstname is required']"
                                                                        hide-details="auto"
                                                                    ></v-text-field>
                                                                </v-col>
                                                                <v-col
                                                                    cols="12"
                                                                    md="6"
                                                                    class="py-0"
                                                                >
                                                                    <label
                                                                        class="font-weight-semibold font-18 text-blue"
                                                                        >Last
                                                                        Name</label
                                                                    >
                                                                    <v-text-field
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="Doe"
                                                                        v-model="
                                                                            profileData.last_name
                                                                        "
                                                                        outlined
                                                                        :rules="[v => !!v || 'Firstname is required']"
                                                                        hide-details="auto"
                                                                    ></v-text-field>
                                                                </v-col>
                                                                <v-col
                                                                    cols="12"
                                                                    md="6"
                                                                    class="py-0"
                                                                >
                                                                    <label
                                                                        class="font-weight-semibold font-18 text-blue"
                                                                        >Email
                                                                        Address</label
                                                                    >
                                                                    <v-text-field
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="you@example.com"
                                                                        v-model="
                                                                            profileData.email
                                                                        "
                                                                        disabled
                                                                        outlined
                                                                        hide-details
                                                                    ></v-text-field>
                                                                </v-col>
                                                                <v-col
                                                                    cols="12"
                                                                    md="6"
                                                                    class="py-0"
                                                                >
                                                                    <label
                                                                        class="font-weight-semibold font-18 text-blue"
                                                                        >Website</label
                                                                    >
                                                                    <v-text-field
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="https://www.example.com"
                                                                        v-model="
                                                                            profileData.website
                                                                        "
                                                                        outlined
                                                                        hide-details
                                                                    ></v-text-field>
                                                                </v-col>
                                                                <v-col
                                                                    cols="12"
                                                                    md="12"
                                                                    class="py-0"
                                                                >
                                                                    <label
                                                                        class="font-weight-semibold font-18 text-blue"
                                                                        >About
                                                                        Me</label
                                                                    >
                                                                    <v-textarea
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="I am SEO begginer."
                                                                        v-model="
                                                                            profileData.about_me
                                                                        "
                                                                        outlined
                                                                        hide-details
                                                                    ></v-textarea>
                                                                </v-col>
                                                            </v-row>
                                                            <div
                                                                class="pb-6 my-12 border-bottom d-flex align-center"
                                                            >
                                                                <v-icon
                                                                    class="mr-4 font-18"
                                                                    >mdi-briefcase</v-icon
                                                                >
                                                                <h4
                                                                    class="mb-0 font-18"
                                                                >
                                                                    Edit
                                                                    Employment
                                                                    Credential
                                                                </h4>
                                                            </div>
                                                            <v-row
                                                                class="mt-12 pt-6"
                                                            >
                                                                <v-col
                                                                    cols="12"
                                                                    md="12"
                                                                    class="py-0"
                                                                >
                                                                    <label
                                                                        class="font-weight-semibold font-18 text-blue"
                                                                        >Position</label
                                                                    >
                                                                    <v-text-field
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="Co Founder"
                                                                        v-model="
                                                                            profileData.position
                                                                        "
                                                                        outlined
                                                                        hide-details
                                                                    ></v-text-field>
                                                                </v-col>
                                                                <v-col
                                                                    cols="12"
                                                                    md="12"
                                                                    class="py-0"
                                                                >
                                                                    <label
                                                                        class="font-weight-semibold font-18 text-blue"
                                                                        >Company
                                                                        /
                                                                        Organization</label
                                                                    >
                                                                    <v-text-field
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="X Company"
                                                                        v-model="
                                                                            profileData.company
                                                                        "
                                                                        outlined
                                                                        hide-details
                                                                    ></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                            <div
                                                                class="pb-6 my-12 border-bottom d-flex align-center"
                                                            >
                                                                <v-icon
                                                                    class="mr-4 font-18"
                                                                    >mdi-school</v-icon
                                                                >
                                                                <h4
                                                                    class="mb-0 font-18"
                                                                >
                                                                    Edit
                                                                    Education
                                                                    Qualification
                                                                </h4>
                                                            </div>
                                                            <v-row
                                                                class="mt-12 pt-6"
                                                            >
                                                                <v-col
                                                                    cols="12"
                                                                    md="12"
                                                                    class="py-0"
                                                                >
                                                                    <label
                                                                        class="font-weight-semibold font-18 text-blue"
                                                                        >School
                                                                        /
                                                                        College
                                                                        /
                                                                        University</label
                                                                    >
                                                                    <v-text-field
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="X University"
                                                                        v-model="
                                                                            profileData.edu_inst
                                                                        "
                                                                        outlined
                                                                        hide-details
                                                                    ></v-text-field>
                                                                </v-col>
                                                                <v-col
                                                                    cols="12"
                                                                    md="6"
                                                                    class="py-0"
                                                                >
                                                                    <label
                                                                        class="font-weight-semibold font-18 text-blue"
                                                                        >Field(s)
                                                                        of
                                                                        Study</label
                                                                    >
                                                                    <v-text-field
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="SEO"
                                                                        v-model="
                                                                            profileData.field
                                                                        "
                                                                        outlined
                                                                        hide-details
                                                                    ></v-text-field>
                                                                </v-col>
                                                                <v-col
                                                                    cols="12"
                                                                    md="6"
                                                                    class="py-0"
                                                                >
                                                                    <label
                                                                        class="font-weight-semibold font-18 text-blue"
                                                                        >Degree
                                                                        Type</label
                                                                    >
                                                                    <v-text-field
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="M.Sc"
                                                                        v-model="
                                                                            profileData.degree
                                                                        "
                                                                        outlined
                                                                        hide-details
                                                                    ></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                            <div
                                                                class="pb-6 my-12 border-bottom d-flex align-center"
                                                            >
                                                                <v-icon
                                                                    class="mr-4 font-18"
                                                                    >mdi-map-marker</v-icon
                                                                >
                                                                <h4
                                                                    class="mb-0 font-18"
                                                                >
                                                                    Edit
                                                                    Location
                                                                    Details
                                                                </h4>
                                                            </div>
                                                            <v-row
                                                                class="mt-12 pt-6"
                                                            >
                                                                <v-col
                                                                    cols="12"
                                                                    md="12"
                                                                    class="py-0"
                                                                >
                                                                    <label
                                                                        class="font-weight-semibold font-18 text-blue"
                                                                        >Location</label
                                                                    >
                                                                    <v-text-field
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="NewYork, USA"
                                                                        v-model="
                                                                            profileData.location
                                                                        "
                                                                        outlined
                                                                        hide-details
                                                                    ></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                            <v-btn
                                                                class="btn-hover my-8"
                                                                color="primary"
                                                                elevation="0"
                                                                type="submit"
                                                            >
                                                                Save Changes
                                                            </v-btn>
                                                        </v-form>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-container
                                        fluid
                                        class="px-0 px-md-8 py-0 py-lg-8"
                                    >
                                        <v-form ref="social" @submit.prevent="social">
                                            <v-row>
                                                <v-col md="12">
                                                    <v-card
                                                        class="question-card elevation-0 border-all"
                                                    >
                                                        <v-card-text>
                                                            <div
                                                                class="pb-6 mb-12 border-bottom d-flex align-center"
                                                            >
                                                                <v-icon
                                                                    class="mr-4 font-18"
                                                                    >mdi-account-circle</v-icon
                                                                >
                                                                <h4
                                                                    class="mb-0 font-18"
                                                                >
                                                                    Social Info
                                                                </h4>
                                                            </div>
                                                            <v-row
                                                                class="mt-12 pt-6"
                                                            >
                                                                <v-col
                                                                    cols="12"
                                                                    md="12"
                                                                    class="py-0"
                                                                >
                                                                    <label
                                                                        class="font-weight-semibold font-18 text-blue"
                                                                        >Facebook
                                                                        Account</label
                                                                    >
                                                                    <v-text-field
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="Enter Link"
                                                                        outlined
                                                                        v-model="profileData.fb"
                                                                        hide-details
                                                                    ></v-text-field>
                                                                </v-col>
                                                                <v-col
                                                                    cols="12"
                                                                    md="12"
                                                                    class="py-0"
                                                                >
                                                                    <label class="font-weight-semibold font-18 text-blue">
                                                                        Twitter Account
                                                                    </label>
                                                                    <v-text-field
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="Enter Link"
                                                                        outlined
                                                                        v-model="profileData.twitter"
                                                                        hide-details
                                                                    ></v-text-field>
                                                                </v-col>
                                                                <v-col
                                                                    cols="12"
                                                                    md="12"
                                                                    class="py-0"
                                                                >
                                                                    <label
                                                                        class="font-weight-semibold font-18 text-blue"
                                                                        >Linkedin Account
                                                                        </label>
                                                                    <v-text-field
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="Enter Link"
                                                                        outlined
                                                                        v-model="profileData.insta"
                                                                        hide-details
                                                                    ></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                            <v-btn
                                                                class="btn-hover my-8"
                                                                color="primary"
                                                                type="submit"
                                                                elevation="0"
                                                            >
                                                                Save
                                                            </v-btn>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                        </v-form>
                                    </v-container>
                                </v-tab-item>
                                <!-- <v-tab-item>
                                    <v-container
                                        fluid
                                        class="px-0 px-md-8 py-0 py-lg-8"
                                    >
                                        <v-row>
                                            <v-col md="12">
                                                <v-card
                                                    class="question-card elevation-0 border-all"
                                                >
                                                    <v-card-text>
                                                        <div
                                                            class="pb-6 mb-12 border-bottom d-flex align-center"
                                                        >
                                                            <v-icon
                                                                class="mr-4 font-18"
                                                                >mdi-account-circle</v-icon
                                                            >
                                                            <h4
                                                                class="mb-0 font-18"
                                                            >
                                                                Topics you know
                                                            </h4>
                                                        </div>
                                                        <v-row
                                                            class="mt-12 pt-6"
                                                        >
                                                            <v-col
                                                                cols="12"
                                                                md="12"
                                                                class="py-0"
                                                            >
                                                                <label
                                                                    class="font-weight-semibold font-18 text-blue"
                                                                    >Search
                                                                    Topics
                                                                    here</label
                                                                >
                                                                <v-autocomplete
                                                                    class="form-line-control with-icon mt-4 font-16"
                                                                    hide-details
                                                                    v-model="
                                                                        value
                                                                    "
                                                                    outlined
                                                                    placeholder="Search here"
                                                                    :items="
                                                                        topicitems
                                                                    "
                                                                    prepend-inner-icon="mdi-format-list-bulleted"
                                                                ></v-autocomplete
                                                                >=
                                                            </v-col>
                                                        </v-row>
                                                        <h4
                                                            class="mb-0 font-18 mt-12"
                                                        >
                                                            Topics you know
                                                            Already
                                                        </h4>
                                                        <v-row class="mt-8">
                                                            <v-col
                                                                cols="12"
                                                                md="6"
                                                            >
                                                                <v-list>
                                                                    <v-list-item-group
                                                                        color="primary"
                                                                    >
                                                                        <v-list-item>
                                                                            <v-list-item-icon>
                                                                                <v-icon
                                                                                    >mdi-adjust</v-icon
                                                                                >
                                                                            </v-list-item-icon>
                                                                            <v-list-item-content>
                                                                                <v-list-item-title
                                                                                    class="d-flex align-center text-light-blue font-weight-semibold"
                                                                                    >Local
                                                                                    SEO
                                                                                    <div
                                                                                        class="ml-auto"
                                                                                    >
                                                                                        <v-icon
                                                                                            >mdi-close</v-icon
                                                                                        >
                                                                                    </div></v-list-item-title
                                                                                >
                                                                            </v-list-item-content>
                                                                        </v-list-item>
                                                                        <v-list-item>
                                                                            <v-list-item-icon>
                                                                                <v-icon
                                                                                    >mdi-adjust</v-icon
                                                                                >
                                                                            </v-list-item-icon>
                                                                            <v-list-item-content>
                                                                                <v-list-item-title
                                                                                    class="d-flex align-center text-light-blue font-weight-semibold"
                                                                                    >Vertical
                                                                                    SEO
                                                                                    <div
                                                                                        class="ml-auto"
                                                                                    >
                                                                                        <v-icon
                                                                                            >mdi-close</v-icon
                                                                                        >
                                                                                    </div></v-list-item-title
                                                                                >
                                                                            </v-list-item-content>
                                                                        </v-list-item>
                                                                        <v-list-item>
                                                                            <v-list-item-icon>
                                                                                <v-icon
                                                                                    >mdi-adjust</v-icon
                                                                                >
                                                                            </v-list-item-icon>
                                                                            <v-list-item-content>
                                                                                <v-list-item-title
                                                                                    class="d-flex align-center text-light-blue font-weight-semibold"
                                                                                    >Global
                                                                                    SEO
                                                                                    <div
                                                                                        class="ml-auto"
                                                                                    >
                                                                                        <v-icon
                                                                                            >mdi-close</v-icon
                                                                                        >
                                                                                    </div></v-list-item-title
                                                                                >
                                                                            </v-list-item-content>
                                                                        </v-list-item>
                                                                    </v-list-item-group>
                                                                </v-list>
                                                            </v-col>
                                                            <v-col
                                                                cols="12"
                                                                md="6"
                                                            >
                                                                <v-list>
                                                                    <v-list-item-group
                                                                        color="primary"
                                                                    >
                                                                        <v-list-item>
                                                                            <v-list-item-icon>
                                                                                <v-icon
                                                                                    >mdi-adjust</v-icon
                                                                                >
                                                                            </v-list-item-icon>
                                                                            <v-list-item-content>
                                                                                <v-list-item-title
                                                                                    class="d-flex align-center text-light-blue font-weight-semibold"
                                                                                    >Image
                                                                                    SEO
                                                                                    <div
                                                                                        class="ml-auto"
                                                                                    >
                                                                                        <v-icon
                                                                                            >mdi-close</v-icon
                                                                                        >
                                                                                    </div></v-list-item-title
                                                                                >
                                                                            </v-list-item-content>
                                                                        </v-list-item>
                                                                        <v-list-item>
                                                                            <v-list-item-icon>
                                                                                <v-icon
                                                                                    >mdi-adjust</v-icon
                                                                                >
                                                                            </v-list-item-icon>
                                                                            <v-list-item-content>
                                                                                <v-list-item-title
                                                                                    class="d-flex align-center text-light-blue font-weight-semibold"
                                                                                    >Baidu
                                                                                    SEO
                                                                                    <div
                                                                                        class="ml-auto"
                                                                                    >
                                                                                        <v-icon
                                                                                            >mdi-close</v-icon
                                                                                        >
                                                                                    </div></v-list-item-title
                                                                                >
                                                                            </v-list-item-content>
                                                                        </v-list-item>
                                                                    </v-list-item-group>
                                                                </v-list>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-tab-item> -->
                                <v-tab-item>
                                    <v-container fluid>
                                        <v-row>
                                            <v-col md="12">
                                                <v-card
                                                    class="question-card elevation-0 border-all"
                                                >
                                                    <v-card-text>
                                                        <v-form ref="pass" @submit.prevent="pass">
                                                            <div
                                                                class="pb-6 mb-12 border-bottom d-flex align-center"
                                                            >
                                                                <v-icon
                                                                    class="mr-4 font-18"
                                                                    >mdi-lock</v-icon
                                                                >
                                                                <h4
                                                                    class="mb-0 font-18"
                                                                >
                                                                    Change
                                                                    Password
                                                                </h4>
                                                            </div>
                                                            <v-row
                                                                class="mt-12 pt-6"
                                                            >
                                                                <v-col
                                                                    cols="12"
                                                                    md="12"
                                                                    class="py-0"
                                                                >
                                                                    <label
                                                                        class="font-weight-semibold font-18 text-blue"
                                                                        >Old
                                                                        Password</label
                                                                    >
                                                                    <v-text-field
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="Enter old password here"
                                                                        type="password"
                                                                        v-model="old_password"
                                                                        :rules="[v => !!v || 'Password is required']"
                                                                        outlined
                                                                        hide-details="auto"
                                                                    ></v-text-field>
                                                                </v-col>
                                                                <v-col
                                                                    cols="12"
                                                                    md="12"
                                                                    class="py-0"
                                                                >
                                                                    <label
                                                                        class="font-weight-semibold font-18 text-blue"
                                                                        >New
                                                                        Password</label
                                                                    >
                                                                    <v-text-field
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="Enter new password here"
                                                                        type="password"
                                                                        v-model="password"
                                                                        :rules="passwordR"
                                                                        outlined
                                                                        hide-details="auto"
                                                                    ></v-text-field>
                                                                </v-col>
                                                                <v-col
                                                                    cols="12"
                                                                    md="12"
                                                                    class="py-0"
                                                                >
                                                                    <label
                                                                        class="font-weight-semibold font-18 text-blue"
                                                                        >Re-enter
                                                                        Password</label
                                                                    >
                                                                    <v-text-field
                                                                        class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                                                        placeholder="Re-enter password here"
                                                                        type="password"
                                                                        v-model="password_confirmation"
                                                                        :rules="[v => !!v && v == password || 'Passwords don\'t match']"
                                                                        outlined
                                                                        hide-details="auto"
                                                                    ></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                            <v-btn
                                                                class="btn-hover my-8"
                                                                color="primary"
                                                                type="submit"
                                                                elevation="0"
                                                            >
                                                                Change Password
                                                            </v-btn>
                                                        </v-form>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-col>
                        <v-col md="12" lg="4" class="gutter-left-space">
                            <ProfileSidebar :profileData="profileData" />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <!-- -----------------------------------------------
					Start Category Card
			----------------------------------------------- -->
        </v-container>
    </div>
</template>
<script>
export default {
    name: "EditProfileBannerTabCard",
    props: ["profileData"],
    data() {
        return {
            tab: null,
            answerClicked: false,
            data: [],
            topicitems: [
                "Vertical SEO",
                "Global SEO",
                "Algorithm Update",
                "Local SEO",
                "Bing SEO",
                "SEO Tools",
                "Youtube SEO",
                "Yondex SEO",
                "SEO Techniques",
                "Image SEO",
                "Baidu SEO"
            ],
            value: null,
            followerlists: [
                {
                    uimg: "/img/users/user2.jpg",
                    uname: "Andrew Jonthan",
                    expertClicked: true,
                    isfollowing: true
                },
                {
                    uimg: "/img/users/user3.jpg",
                    uname: "Rebecca Flintoff",
                    expertClicked: false,
                    isfollowing: false
                },
                {
                    uimg: "/img/users/user4.jpg",
                    uname: "Asgar Ali",
                    expertClicked: false,
                    isfollowing: true
                },
                {
                    uimg: "/img/users/user2.jpg",
                    uname: "Matthew Doe",
                    expertClicked: false,
                    isfollowing: false
                },
                {
                    uimg: "/img/users/user3.jpg",
                    uname: "Maclom Marshell",
                    expertClicked: false,
                    isfollowing: true
                },
                {
                    uimg: "/img/users/user4.jpg",
                    uname: "John Doe",
                    expertClicked: false,
                    isfollowing: false
                },
                {
                    uimg: "/img/users/user2.jpg",
                    uname: "Kartina Kaif",
                    expertClicked: false,
                    isfollowing: false
                },
                {
                    uimg: "/img/users/user3.jpg",
                    uname: "Noora Jackline",
                    expertClicked: false,
                    isfollowing: false
                },
                {
                    uimg: "/img/users/user4.jpg",
                    uname: "Kartina Kaif",
                    expertClicked: false,
                    isfollowing: false
                }
            ],
            old_password: '',
            password: '',
            password_confirmation: '',
            passwordR: [
                v => !!v || "Password is required",
                v => !!v && v.length >= 8 || "Password too short",
                v => !!v && /[a-z]/.test(v) || "Password must contain a letter",
                v => !!v && /[0-9]/.test(v) || "Password must contain a digit",
            ],
        };
    },
    methods: {
        accSave(){
            if(this.$refs.acc.validate()){
                this.$axios.$post('user/edit', this.profileData)
                .then(() => {
                    this.$router.push({name: 'users-username-profile', params: {username: this.$route.params.username}})
                })
            }
        },
        social(){
            if(this.$refs.social.validate()){
                this.$axios.$post('user/edit', {
                    fb : this.profileData.fb,
                    twitter : this.profileData.twitter,
                    insta : this.profileData.insta,
                })
                .then(() => {
                    this.$router.push(`/users/${this.$route.params.username}/profile`)
                })
            }
        },
        pass(){
            if(this.$refs.pass.validate()){
                this.$axios.post('user/password', {
                    password : this.password,
                    password_confirmation : this.password_confirmation,
                    old_password : this.old_password,
                })
                .then((res) => {
                    this.$swal({
                        title: "Success!",
                        text: res.data.message,
                        icon: "success"
                    })
                    this.$refs.pass.reset()
                })
                .catch((err) => {
                    this.$swal({
                        title: `Error ${err.response.status}`,
                        text: err.response.data.message,
                        icon: "error"
                    })
                })
            }
        }
    },
    components: {
        // AnswerEditor: () => import("@/components/sections/answer/AnswerEditor"),
        ProfileSidebar: () =>
            import("@/components/sections/question/ProfileSidebar")
    }
};
</script>

<style lang="scss">
@media (max-width: 767px) {
    .user-img.v-image {
        max-width: 50px;
    }
}
</style>
