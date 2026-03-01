# Contributing to LBDP

## How to Contribute

### 1. Setup Development Environment
```bash
# Clone repository
git clone <repository-url>
cd LBDP

# Setup backend
cd app/shop-backend
npm install
cp .env.example .env
# Edit .env with your database credentials

# Setup database
createdb FindMeDB -U postgres
psql -d FindMeDB -U postgres -f ../findmeDB.sql
psql -d FindMeDB -U postgres -f ../demo-final.sql

# Start backend
npm start
```

### 2. Code Style Guidelines

#### JavaScript/TypeScript
- Use camelCase for variables and functions
- Use PascalCase for classes and components
- Add JSDoc comments for functions
- Use async/await instead of callbacks

#### Example
```javascript
// Good
const getUserById = async (userId) => {
  try {
    const user = await userService.findById(userId);
    return user;
  } catch (error) {
    throw new Error(`User not found: ${error.message}`);
  }
};

// Bad
function getuser(userid){
  return userService.findbyid(userid, function(err, user){
    if(err) throw err;
    return user;
  });
}
```

#### SQL
- Use uppercase for SQL keywords
- Use snake_case for table/column names
- Add comments for complex queries
- Use parameterized queries

### 3. Project Structure

#### Backend
```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── services/        # Business logic
├── routes/          # API routes
├── middlewares/      # Custom middleware
├── validators/       # Input validation
├── utils/           # Helper functions
└── models/          # Data models (if needed)
```

#### Frontend
```
src/
├── components/      # Reusable components
├── screens/         # Screen components
├── services/        # API calls
├── navigation/      # Navigation config
├── utils/           # Helper functions
└── assets/          # Images, fonts, etc.
```

### 4. Development Workflow

#### 1. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

#### 2. Make Changes
- Write clean, commented code
- Follow existing patterns
- Add tests if applicable
- Update documentation

#### 3. Test Changes
```bash
# Backend tests
cd app/shop-backend
npm test

# Frontend tests
cd app/mobile
npm test
```

#### 4. Submit Pull Request
- Push to your fork
- Create pull request
- Describe changes clearly
- Wait for review

### 5. Types of Contributions

#### Bug Fixes
- Describe the bug and how to reproduce
- Include test cases
- Fix without breaking existing functionality

#### New Features
- Explain the use case
- Follow existing patterns
- Update documentation

#### Documentation
- Fix typos and grammar
- Add missing examples
- Improve clarity

#### Performance
- Optimize database queries
- Improve API response times
- Reduce bundle sizes

### 6. Code Review Process

#### What We Look For
- ✅ Code follows style guidelines
- ✅ Tests pass
- ✅ Documentation updated
- ✅ No breaking changes
- ✅ Security considerations

#### Review Checklist
- [ ] Code is readable and maintainable
- [ ] Error handling is proper
- [ ] Input validation is present
- [ ] Database queries are optimized
- [ ] API responses are consistent

### 7. Issue Reporting

#### Bug Reports
Use this template:
```markdown
**Description**
Brief description of the issue

**Steps to Reproduce**
1. Go to...
2. Click on...
3. See error...

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g., Windows 10, macOS 12]
- Browser: [e.g., Chrome 98, Safari 15]
- Version: [e.g., v1.2.3]
```

#### Feature Requests
```markdown
**Problem Statement**
What problem needs solving

**Proposed Solution**
How you think it should be solved

**Alternatives Considered**
Other approaches you thought of

**Additional Context**
Any other relevant information
```

### 8. Community Guidelines

#### Be Respectful
- Use inclusive language
- Welcome newcomers
- Assume good intentions

#### Be Constructive
- Focus on what's best for the project
- Provide specific, actionable feedback
- Acknowledge good work

#### Be Patient
- Response times may vary
- Not all contributions can be accepted
- Explain reasoning for decisions

### 9. Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

### 10. License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Questions?

- Check existing issues first
- Ask in discussions for general questions
- Contact maintainers for sensitive issues

Thank you for contributing to LBDP! 🙏
