import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Department from '@/models/Department';
import Team from '@/models/Team';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('🔐 Auth attempt for:', credentials.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing credentials');
          return null;
        }

        // --- DEV BYPASS DUE TO MONGODB RESTRICTIONS ---
        const bypassUsers = [
          {
            email: 'admin@astu.edu.et',
            password: 'Admin123!',
            id: 'mock-admin-id',
            firstName: 'System',
            lastName: 'Administrator',
            fullName: 'System Administrator',
            role: 'admin',
            employeeId: 'ADM001',
            position: 'System Administrator',
            permissions: ['manage_users', 'manage_departments', 'approve_results', 'view_reports']
          },
          {
            email: 'leader@company.com',
            password: 'Leader123!',
            id: 'mock-leader-id',
            firstName: 'John',
            lastName: 'Leader',
            fullName: 'John Leader',
            role: 'team-leader',
            employeeId: 'TL001',
            position: 'Development Team Lead',
            permissions: ['create_task', 'edit_task', 'delete_task', 'evaluate_peer', 'view_reports']
          },
          {
            email: 'alice@company.com',
            password: 'Employee123!',
            id: 'mock-employee-id',
            firstName: 'Alice',
            lastName: 'Developer',
            fullName: 'Alice Developer',
            role: 'employee',
            employeeId: 'EMP001',
            position: 'Software Developer',
            permissions: ['evaluate_self', 'evaluate_peer']
          }
        ];

        const mockUser = bypassUsers.find(u => u.email === credentials.email && u.password === credentials.password);
        if (mockUser) {
          console.log('✅ Bypassed MongoDB DB Connection via hardcoded user:', mockUser.email);
          return mockUser;
        }
        // --- END DEV BYPASS ---

        try {
          console.log('🔌 Connecting to MongoDB...');
          await connectDB();
          console.log('✅ MongoDB connected successfully');
          
          console.log('🔍 Searching for user:', credentials.email);
          const user = await User.findOne({ 
            email: credentials.email.toLowerCase(),
            isActive: true 
          }).populate('department team');

          if (!user) {
            console.log('❌ User not found:', credentials.email);
            return null;
          }

          console.log('✅ User found:', user.email, 'Role:', user.role);

          console.log('🔐 Verifying password...');
          const isPasswordValid = await user.comparePassword(credentials.password);
          
          if (!isPasswordValid) {
            console.log('❌ Invalid password for user:', credentials.email);
            return null;
          }

          console.log('✅ Password verified successfully');

          // Update last login
          await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

          const userData = {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName,
            role: user.role,
            department: user.department,
            team: user.team,
            employeeId: user.employeeId,
            position: user.position,
            permissions: user.permissions,
            profileImage: user.profileImage
          };

          console.log('✅ Returning user data:', userData);
          return userData;
        } catch (error) {
          console.error('❌ Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.permissions = user.permissions;
        token.department = user.department;
        token.team = user.team;
        token.employeeId = user.employeeId;
        token.position = user.position;
        token.profileImage = user.profileImage;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.permissions = token.permissions;
        session.user.department = token.department;
        session.user.team = token.team;
        session.user.employeeId = token.employeeId;
        session.user.position = token.position;
        session.user.profileImage = token.profileImage;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect based on user role after login
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug mode
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
