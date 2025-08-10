import { faker } from '@faker-js/faker';

export class TestDataBuilder {
  constructor() {
    this.data = {};
  }

  withRandomEmail() {
    this.data.email = faker.internet.email();
    return this;
  }

  withRandomPassword(length = 12) {
    this.data.password = faker.internet.password({ length });
    return this;
  }

  withRandomFullName() {
    this.data.firstName = faker.person.firstName();
    this.data.lastName = faker.person.lastName();
    this.data.fullName = `${this.data.firstName} ${this.data.lastName}`;
    return this;
  }

  withRandomComment() {
    this.data.comment = faker.lorem.paragraph();
    return this;
  }

  generate() {
    const result = { ...this.data };
    this.data = {};
    return result;
  }

  static createCommentData() {
    return new TestDataBuilder()
      .withRandomEmail()
      .withRandomFullName()
      .withRandomComment()
      .generate();
  }
}